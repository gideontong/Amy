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
const debugChannel = '735272343773118504';
const leoSecondary = '756250474478305390';

const timeZone = 'America/Los_Angeles';

// TODO:
// Rate limit to an hour, and also check timezones

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

    const oldStatus = oldPresence.clientStatus;
    const newStatus = newPresence.clientStatus;
    const oldWebStatus = 'web' in oldStatus ? oldStatus['web'] : 'offline';
    const newWebStatus = 'web' in newStatus ? newStatus['web'] : 'offline';
    const oldMobileStatus = 'mobile' in oldStatus ? oldStatus['mobile'] : 'offline';
    const newMobileStatus = 'mobile' in newStatus ? newStatus['mobile'] : 'offline';
    const oldDesktopStatus = 'desktop' in oldStatus ? oldStatus['desktop'] : 'offline';
    const newDesktopStatus = 'desktop' in newStatus ? newStatus['desktop'] : 'offline';

    const currentTime = new Date(new Date().toLocaleString([], { timeZone: timeZone }));
    const currentHour = currentTime.getHours();

    channels.fetch(debugChannel)
        .then((channel) => {
            // Leo's second account online
            if (snowflake == leoSecondary && oldPresence.status == 'offline' && newPresence.status != 'offline') {
                channel.send('Leo is taking a dump');
            }

            // Anyone appears online on mobile
            else if (oldMobileStatus == 'offline' && newMobileStatus != 'offline') {
                // Early morning
                if (currentHour < 6) {
                    channel.send(`${name} is staying up real late`);
                }

                // Normal morning
                else if (currentHour < 13) {
                    channel.send(`${name} is finally waking up`);
                }

                // Afternoon
                else if (currentHour < 17) {
                    channel.send(`${name} is possibly going outside`);
                }
            }

            // Turn on the computer
            else if (oldDesktopStatus == 'offline' && newDesktopStatus != 'offline') {
                // Morning
                if (currentHour > 5 && currentHour < 12) {
                    channel.send(`${name} has finally turned on their computer`);
                }
            }

            // Anyone goes offline on mobile and offline completely
            else if (oldMobileStatus != 'offline' && newMobileStatus == 'offline' && newStatus == 'offline') {
                // Morning
                if (currentHour > 5 && currentHour < 12) {
                    channel.send(`${name} is going back to sleep`);
                }
            }
        })
        .catch(_ => { });

    channels.fetch(debugChannel)
        .then((channel) => {
            const emit = new Array();

            if (oldPresence.status != newPresence.status) {
                emit.push(`from ${oldPresence.status} to ${newPresence.status}`);
            }


            if (oldWebStatus != newWebStatus) {
                emit.push(`web status from ${oldWebStatus} to ${newWebStatus}`);
            }

            if (oldMobileStatus != newMobileStatus) {
                emit.push(`mobile status from ${oldMobileStatus} to ${newMobileStatus}`);
            }

            if (oldDesktopStatus != newDesktopStatus) {
                emit.push(`desktop status from ${oldDesktopStatus} to ${newDesktopStatus}`);
            }

            if (!emit.length) return;
            channel.send({
                embed: {
                    title: 'Online Status Change',
                    description: name + ' changed ' + emit.join(' and '),
                    color: 962228
                }
            })
                .catch(_ => { });
        })
        .catch(_ => { });
}