const host = 'api.openweathermap.org';
const endpoint = '/data/2.5/weather';
const colors = 0xFFFFFF;

const { weather: key } = require('../config/secrets.json');
const { authenticatedGet } = require('../lib/Internet');
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

/**
 * Get the weather for a city
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length < 2) {
        msg.channel.send('You need to provide me the name of a city, like `weather New York` in order to get a result!');
        return;
    }
    const search = msg.content.substring(args[0].length + 1);
    const query = {
        q: search,
        appid: key
    };
    authenticatedGet(function (weather) {
        log.info(`Weather information retrieved for: ${search}`);
        if (weather.cod == 200) {
            const embed = generateEmbed(weather, false);
            msg.channel.send(embed)
                .then(message => {
                    const filter = (reaction, user) => {
                        return reaction.emoji.name == '💡' && user.id == msg.author.id;
                    }
                    message.react('💡');
                    message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                        .then(collected => {
                            const celsiusEmbed = generateEmbed(weather);
                            message.edit(celsiusEmbed);
                        })
                        .catch(collected => { });
                });
        } else if (weather.cod == 404) {
            msg.channel.send(`Are you sure that is a city? If you think \`${search}\` should be a city, please let me know with the \`suggest\` command. Thanks!`);
            return;
        } else {
            msg.channel.send(`Something... strange... happened. Please file a bug report with the \`suggest\` command and let me know you got error code ${weather.cod} when you used the weather command.`);
            log.error(`Got neither a 200 or a 404 response code from weather, got ${weather} instead.`);
            return;
        }
    }, host, endpoint, query);
}

/**
 * Generates an embed
 * @param {Object} weather Weather data from server
 * @param {Boolen} celsius Use Celsius, else Fahrenheit
 * @returns {MessageEmbed} The corresponding weather embed
 */
function generateEmbed(weather, celsius = true) {
    const flag = celsius ? 'C' : 'F';
    const icon = weather.weather && weather.weather[0] && weather.weather[0].icon ? weather.weather[0].icon : '01d';
    const temperature = convertTemperature(weather.main.temp, celsius);
    const low = convertTemperature(weather.main.temp_min, celsius);
    const high = convertTemperature(weather.main.temp_max, celsius);
    const embed = new MessageEmbed()
        .addField('Temperature', `${temperature}°${flag}`, true)
        .addField('⛄ Low', `${low}°${flag}`, true)
        .addField('🔥 High', `${high}°${flag}`, true)
        .addField('Visibility', `${convertLength(weather.visibility)} mi`, true)
        .addField('Wind', `${convertSpeed(weather.wind.speed)} mph`, true)
        .addField('Cloudiness', `${weather.clouds.all}%`, true)
        .setColor(getColor(weather.sys.sunrise, weather.sys.sunset))
        .setDescription(getDescription(weather.weather))
        .setFooter(celsius ? 'You cannot go back after seeing the superior temperature system.' : 'Click the lightbulb to see me in Celsius!')
        .setThumbnail(`https://openweathermap.org/img/wn/${icon}@4x.png`)
        .setTitle(`🌡 ${temperature}°${flag} at ${weather.name ? weather.name : 'Unknown City'}`);
    return embed;
}

/**
 * Gets a description
 * @param {Array} weather Weather to analyze
 * @returns {String} Weather string description
 */
function getDescription(weather = []) {
    let currently;
    if (weather.length == 2) {
        currently = `${weather[0].description} and ${weather[1].description}`;
    } else {
        let appending = [];
        weather.forEach(item => {
            appending.push(item.description);
        });
        currently = appending.join();
    }
    return `There is currently ${currently} outside.`;
}

/**
 * Gets the color of the embed
 * @param {Number} sunrise Time of sunrise (Unix time, seconds)
 * @param {Number} sunset Time of sunset (Unix time, seconds)
 * @returns {Number} Color of embed
 */
function getColor(sunrise, sunset) {
    const gold = 0xF7C46A;
    const purple = 0x2E1A47;
    if (!(sunrise && sunset)) {
        log.warn("Wasn't provided a valid sunset and sunrise, generating random weather color");
        return Math.floor(Math.random() * colors);
    }
    const now = new Date().getHours();
    const sunriseHour = new Date(sunrise * 1000).getHours();
    const sunsetHour = new Date(sunset * 1000).getHours();
    if (now < sunriseHour || now >= sunsetHour) {
        return purple;
    } else {
        return gold;
    }
}

/**
 * Convert a temperature
 * @param {Number} temperature Kelvin temperature
 * @param {Boolen} celsius Convert to Celsius? (if false, use Fahrenheit)
 * @returns {Number} Temperature in another format
 */
function convertTemperature(temperature, celsius = true) {
    if (celsius) {
        return Math.floor(temperature - 273);
    } else {
        return Math.floor(celsius * 9 / 5 + 32);
    }
}

/**
 * Get a distance in miles
 * @param {Number} distance Distance in meters
 * @returns {Number} Distance in miles
 */
function convertLength(distance) {
    return Math.floor(distance / 1609);
}

/**
 * Convert a distance to mph
 * @param {Number} speed Speed in m/s
 * @returns {Number} Speed in mph
 */
function convertSpeed(speed) {
    return Math.floor(speed / 2.237);
}