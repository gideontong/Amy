const LEFT = '◀';
const RIGHT = '▶';
const OPTIONS = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
const MAX_NAME_LENGTH = 20;
const RESPOND_TIME = 60;

/**
 * Create invite for a server
 * @param {Message} msg Message
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const client = msg.client;
    const author = msg.author.id;

    const guilds = Array.from(client.guilds.cache.values());
    const pages = Math.floor(guilds.length / OPTIONS.length) + 1;

    var page = 0;
    var [message, indexes] = generatePage(guilds, page);
    var object = {
        description: message,
        footer: {
            text: `Page ${page + 1}/${pages}: ${guilds.length} servers available.`
        }
    }
    channel.send({ embed: object })
        .then(msg => {
            msg.react(LEFT);
            msg.react(RIGHT);
            OPTIONS.forEach(option => {
                msg.react(option);
            });

            const filter = (reaction, user) => (reaction.emoji.name == LEFT || reaction.emoji.name == RIGHT || OPTIONS.some(option => option == reaction.emoji.name)) && author == user.id;
            const collector = msg.createReactionCollector(filter, { time: RESPOND_TIME * 1000 });
            collector.on('collect', reaction => {
                if (reaction.emoji.name == LEFT) {
                    if (page > 0) {
                        page--;
                        [message, indexes] = generatePage(guilds, page);
                        object.description = message;
                        object.footer.text = `Page ${page + 1}/${pages}: ${guilds.length} servers available.`;
                        msg.edit({ embed: object });
                    }
                } else if (reaction.emoji.name == RIGHT) {
                    if (page < pages - 1) {
                        page++;
                        [message, indexes] = generatePage(guilds, page);
                        object.description = message;
                        object.footer.text = `Page ${page + 1}/${pages}: ${guilds.length} servers available.`;
                        msg.edit({ embed: object });
                    }
                } else {
                    const idx = OPTIONS.indexOf(reaction.emoji.name);
                    const guild = guilds[indexes[idx]];

                    channel.send({
                        embed: {
                            description: `You picked ${guild.name}, looking for invites...`
                        }
                    })
                        .then(msg_ => {
                            if (guild.available) {
                                guild.fetchInvites()
                                    .then(invites => {
                                        if (invites.size > 0) {
                                            const invite = invites.first();
                                            channel.send(invite.url);
                                        } else {
                                            channel.send({
                                                embed: {
                                                    description: 'No pre-generated invites, attempting to generate an invite...'
                                                }
                                            })
                                                .then(msg__ => {
                                                    const channels = Array.from(guild.channels.cache.values());
                                                    for (guildChannel in channels) {
                                                        if (guildChannel.viewable) {
                                                            const invite = guildChannel.createInvite();
                                                            return channel.send(invite.url);
                                                        }
                                                    }
                                                    channel.send({
                                                        embed: {
                                                            description: 'Ultimately failed. Unable to find a suitable channel.'
                                                        }
                                                    });
                                                });
                                        }
                                    })
                                    .catch(err => {
                                        const spicy = {
                                            description: 'I wasn\'t able to access pre-generated invites, attempting to generate an invite...'
                                        };
                                        channel.send({ embed: spicy })
                                            .then(msg__ => {
                                                const channels = Array.from(guild.channels.cache.values());
                                                for (const guildChannel of channels) {
                                                    spicy.footer = {
                                                        text: `Looking at #${guildChannel.name}...`
                                                    };
                                                    msg__.edit({ embed: spicy });
                                                    if (['store', 'category', 'unknown'].includes(guildChannel.type)) continue;
                                                    if (guildChannel.viewable) {
                                                        guildChannel.createInvite()
                                                            .then(invite => {
                                                                channel.send(invite.url)
                                                            });
                                                        return;
                                                    }
                                                }
                                                channel.send({
                                                    embed: {
                                                        description: 'Ultimately failed. Unable to find a suitable channel.'
                                                    }
                                                });
                                            });
                                    });

                            } else {
                                channel.send({
                                    embed: {
                                        description: 'This server seems to be offline or inaccessible!'
                                    }
                                });
                            }
                        });
                }
            });
        });
}

/**
 * Get some page descriptions!
 * @param {Array} guilds Guilds
 * @param {Number} page Page number
 * @returns Array of message and guild indexes
 */
function generatePage(guilds, page) {
    const start = page * OPTIONS.length;
    const end = Math.min(start + OPTIONS.length, guilds.length);

    var message = String();
    var indexes = Array();
    for (let i = start; i < end; i++) {
        message += `${OPTIONS[i - start]} ${guilds[i].name.substr(0, MAX_NAME_LENGTH)}\n`;
        indexes.push(i);
    }

    return [message, indexes];
}
