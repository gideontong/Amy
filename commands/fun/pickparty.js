const valorant = '<:valorant:805543486555684895>';
const agents = [
    {
        name: 'Brimstone',
        icon: '<:brimstone:805567998697799730>'
    },
    {
        name: 'Phoenix',
        icon: '<:phoenix:805567997808738334>'
    },
    {
        name: 'Sage',
        icon: '<:sage:805567998467113050>'
    },
    {
        name: 'Sova',
        icon: '<:sova:805567998613258250>'
    },
    {
        name: 'Viper',
        icon: '<:viper:805567998290034699>'
    },
    {
        name: 'Cypher',
        icon: '<:cypher:805567997950558250>'
    },
    {
        name: 'Reyna',
        icon: '<:reyna:805568000613810216>'
    },
    {
        name: 'Killjoy',
        icon: '<:killjoy:805568000278790144>'
    },
    {
        name: 'Breach',
        icon: '<:breach:805570995616350238>'
    },
    {
        name: 'Omen',
        icon: '<:omen:805567997682122772>'
    },
    {
        name: 'Jett',
        icon: '<:jett:805567998210867242>'
    },
    {
        name: 'Raze',
        icon: '<:raze:805567998760321044>'
    },
    {
        name: 'Skye',
        icon: '<:skye:805568000304349184>'
    },
    {
        name: 'Yoru',
        icon: '<:yoru:805567999096258590>'
    }
];

const error = {
    title: "Error!",
    description: `${valorant} Valorant only allows parties of 5. You have to mention less people than that if you want me to pick random agents for your team to play.`,
    color: 16711680
};

/**
 * Pick some Valorant agents
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const mentions = msg.mentions.users;
    if (mentions.size > 5) {
        return channel.send({ embed: error });
    }
    const players = mentions.size == 0 ? 5 : mentions.size;
    const users = mentions.keyArray();
    var idxs = new Set();
    while (idxs.size < players) {
        idxs.add(Math.floor(Math.random() * agents.length));
    }
    var idxsArray = Array.from(idxs.keys());
    var description = new String();
    for (let i = 0; i < players; i++) {
        description += `${agents[idxsArray[i]].icon} ${agents[idxsArray[i]].name} ${mentions.size ? 'has been assigned to <@' + users[i] + '>' : ''}\n`
    }
    channel.send({
        embed: {
            title: "Your agents have been picked!",
            description: description,
            color: 11609065
        }
    });
}