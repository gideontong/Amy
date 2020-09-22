const reqEvent = (event) => require(`./events/${event}`);
module.exports = client => {
    client.on('guildCreate', reqEvent('guildCreate'));
    client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
    client.on('guildMemberUpdate', reqEvent('guildMemberUpdate'));
    client.on('message', reqEvent('message'));
    client.on('messageDelete', reqEvent('messageDelete'));
    client.on('messageReactionAdd', reqEvent('messageReactionAdd'));
    client.on('messageReactionRemove', reqEvent('messageReactionRemove'));
    client.on('presenceUpdate', reqEvent('presenceUpdate'));
}