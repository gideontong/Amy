// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const { grantAchievement } = require('../lib/Achievement');
const { MessageAttachment } = require('discord.js');
const log = require('log4js').getLogger('amy');

// Activities are the following:
// newPresence.activities -> Array<Activity>
// Activity.type -> {PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM_STATUS}
// Activity.name -> 1st line, main name
// Activity.state -> 3rd line in Rich Presence only
// Activity.details -> should be name in CUSTOM_STATUS but not read correctly, do not use
module.exports = async (oldPresence, newPresence) => {
    try {
        if (newPresence.activities && newPresence.activities[0].type == "PLAYING") {
            let name = newPresence.activities[0].name.toLowerCase();
            let leo = newPresence.guild.members.cache.get(targets.leo);
            let channel = newPresence.client.channels.cache.get(targets.general);
            if (leo) {
                let nick = leo.nickname;
                if (name == "leo" || name == nick || name.includes("leo ")) {
                    const buffer = await grantAchievement(newPresence.member.id, 'leoStatus');
                    if (buffer) {
                        const image = new MessageAttachment(buffer);
                        channel.send(`<@${newPresence.user.id}> you really did it, the madman...`, image);
                        log.info(`${newPresence.user.tag} ${newPresence.user} obtained achievement leoStatus`);
                    }
                }
            }
        }
    } catch (err) {
        log.error(`Something weird happened in getting a new presence and I got this instead: ${err}`);
    }
}