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

const updateChannel = '548523285172715550';
const log = require('log4js').getLogger('kevin');

/**
 * Determine a presence change. Used for updating when
 * someone wakes up and such.
 * @param {Presence} oldPresence Old Presence data
 * @param {Presence} newPresence New Presence data
 */
module.exports = async (oldPresence, newPresence) => {
    const snowflake = newPresence.userID;
    if (!(snowflake in enabledUsers)) return;
    log.info(`${snowflake} changed their status to ${newPresence.status}`);

    const client = newPresence.client;
    const channels = client.channels;
    
    channels.fetch(updateChannel)
        .then((channel) => {
            if (oldPresence.status != newPresence.status) {
                channel.send(`${enabledUsers[snowflake]} changed their status from ${oldPresence.status} to ${newPresence.status}`);
            }
        })
        .catch(err => { });
}