// Users in this beta test
const enabledUsers = {
    '107890862679162880': 'Brian',
    '132525049977503744': 'Gideon',
    '578715287491182595': 'Leo',
    '371876953491505152': 'Max',
    '100385247287341056': 'Jeremiah',
    '257613641698902016': 'Kevin',
    '580246928596664321': 'Aedan',
    '756250474478305390': 'Leo'
};

const trackingGuild = '691848461217169438';
const updateChannel = '735272343773118504';
const log = require('log4js').getLogger('kevin');

// TODO:
// User has woken up
// User has gone back to sleep
// User has finally turned on their computer
// Leo has gone outside (main on mobile)
// Leo is taking a dump (second account online)
// User is wanking (posting in sauce channel)

/**
 * Determine a presence change. Used for updating when
 * someone wakes up and such.
 * @param {Presence} oldPresence Old Presence data
 * @param {Presence} newPresence New Presence data
 */
module.exports = async (oldPresence, newPresence) => {
    if (!oldPresence) return;

    const guild = newPresence.guild;
    if (!(guild.available && guild.id == trackingGuild)) return;

    const snowflake = newPresence.userID;
    if (!(snowflake in enabledUsers)) return;
    const name = enabledUsers[snowflake];

    const client = newPresence.client;
    const channels = client.channels;
    
    channels.fetch(updateChannel)
        .then((channel) => {
            const emit = new Array();
            
            if (oldPresence.status != newPresence.status) {
                emit.push(`from ${oldPresence.status} to ${newPresence.status}`);
            }

            const oldStatus = oldPresence.clientStatus;
            const newStatus = newPresence.clientStatus;
            const oldMobile = 'mobile' in oldStatus && oldStatus['mobile'] != 'idle';
            const newMobile = 'mobile' in newStatus && newStatus['mobile'] != 'idle';
            if (oldMobile != newMobile) {
                emit.push('mobile status');
            }

            if (!emit.length) return;
            channel.send(name + ' changed ' + emit.join(' and '))
                .catch(_ => { });
        })
        .catch(_ => { });
}