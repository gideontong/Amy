const reqEvent = (event) => require(`./events/${event}`);
module.exports = client => {
    client.on('message', reqEvent('message'));
    client.on('presenceUpdate', reqEvent('presenceUpdate'));
}