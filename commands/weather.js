const host = 'api.openweathermap.org';
const endpoint = '/data/2.5/weather';
const colors = 0xFFFFFF;
const descriptions = {
    2: 'It is currently thundering outside, so you should try to stay safe. You may want to bring an umbrella just in case.',
    3: 'Currently, it is drizzling outside, so you could get away with just a raincoat, or even a normal jacket. An umbrella may be safe anyways.',
    5: 'It is raining outside. You need an umbrella for sure. Based on your tolerance for weather, you may also want a jacket or heavy raincoat.',
    6: 'Snow! Be careful of ice that may form on the roads, creating slicks or black ice that is impossible to be safe on. Wear enough clothing to stay warm.',
    7: 'There is currently limited visibility outside. You may want to consider not leaving unless absolutely necessary as there is a higher risk of car accidents.',
    8: 'It\'s nice outside today. Go have some fun!'
}

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
        log.info(weather);
        if (weather.cod == 200) {
            const embed = generateEmbed(weather, false);
            msg.channel.send(embed);
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
    const temperature = Math.floor(convertTemperature(weather.main.temp, celsius));
    const low = Math.floor(convertTemperature(weather.main.temp_min, celsius));
    const high = Math.floor(convertTemperature(weather.main.temp_max, celsius));
    let weatherIDs = [];
    weather.weather.forEach(value => {
        weatherIDs.push(value.id);
    });
    const embed = new MessageEmbed()
        .addField('Temperature', `${temperature}°${flag}`, true)
        .addField('⛄ Low', `${low}°${flag}`, true)
        .addField('🔥 High', `${high}°${flag}`, true)
        .setColor(getColor(weather.sys.sunrise, weather.sys.sunset))
        .setDescription(getDescriptions(weatherIDs))
        .setThumbnail(`https://openweathermap.org/img/wn/${icon}@4x.png`)
        .setTitle(`🌡 ${temperature}°${flag} at ${weather.name ? weather.name : 'Unknown City'}`);
    return embed;
}

/**
 * Gets a description
 * @param {Array} id ID of weather codes from server
 */
function getDescriptions(id = [800]) {
    strings = [];
    id.forEach(value => {
        strings.push(descriptions[Math.floor(id / 100)]);
    })
    return strings.join(' ');
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
        return temperature - 273;
    } else {
        return celsius * 9 / 5 + 32;
    }
}