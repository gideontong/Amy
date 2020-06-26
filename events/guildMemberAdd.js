// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for a new member added
module.exports = async member => {
    if (member.user.bot) return;
    member.createDM()
        .send(`Hey! Welcome to the Dudes of 708 Discord server. If you have questions about the server, ask anyone with the tag **Dudes of 708**. Questions about me, feel free to ask **Gideon#5433**. I don't respond to messages yet, but enjoy your stay!`);
    log.info(`${member.user.tag} ${member} joined the server`);
}