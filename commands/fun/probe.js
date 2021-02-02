const akovID = '727603104807256168';
const timeout = 5;

const determinstic = {
    prostate: {
        exists: [
            '132525049977503744',
            '371876953491505152'
        ],
        missing: [
            '578715287491182595',
            '756208954031341688'
        ]
    },
    messages: {
        prostate: {
            exists: 'A prostate was found!',
            missing: 'No prostate was found! A prostate check cannot be preformed. Please consult your local doctor for more information if you believe this to be in error.'
        },
        wellness: {
            high: 'It was found to be very healthy. You are in good hands and good shape.',
            medium: 'You are doing alright, but you need to get back into exercise! ( ͡° ͜ʖ ͡°)',
            low: 'This is not exactly much of what we could consider a prostate, though...'
        }
    }
};

/**
 * Do the big probe
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const akov = msg.client.users.cache.find(user => user.id == akovID);
    const user = msg.mentions.users.size > 0 ? msg.mentions.users.first() : msg.author;
    const channel = msg.channel;
    if (akov) {
        if (akov.presence.status != 'offline') {
            return channel.send('My co-conspirator Akov can help you with that.');
        } else {
            var description;
            if (determinstic.prostate.missing.includes(user.id) || (!determinstic.prostate.exists.includes(user.id) && Math.random() < 0.5)) {
                description = determinstic.messages.prostate.missing;
            } else {
                const rand = Math.random();
                if (rand < 0.1) {
                    description = `${determinstic.messages.prostate.exists} ${determinstic.messages.wellness.low}`;
                } else if (rand < 0.7) {
                    description = `${determinstic.messages.prostate.exists} ${determinstic.messages.wellness.medium}`;
                } else {
                    description = `${determinstic.messages.prostate.exists} ${determinstic.messages.wellness.high}`;
                }
            }
            const embed = {
                title: 'Prostate Check',
                description: description,
                color: 0xD60EC6,
                footer: {
                    text: 'Wellness Check ✅ provided by AmyHealth'
                }
            };
            channel.send(`Now probing ${user}...`)
                .then(message => {
                    setTimeout(() => {
                        message.edit({
                            content: '',
                            embed: embed
                        });
                    }, timeout * 1000);
                });
        }
    } else {
        channel.send("I can't find my co-conspirator, Akov... I kinda need him in order to do some probing.")
    }
}