const TO_DELETE = 20;
const MESSAGES = [
    'Did you know Leo is gay?',
    'Every time you go live, you can go live.',
    'Sasha Grey is an American actress according to Wikipedia.',
    'This is an unmoderated channel.',
    'Sleeping on the job again, are we?',
    '640K ought to be enough for anybody.',
    'This process is automatic.',
    'Never forget the importance of having fun.',
    'Do not take life too seriously.',
    'Blowing your mind yet?',
    'Why do they call it rush hour when nothing moves?',
    'Life is short.',
    'Smile while you still have teeth.',
    'Do not read the next sentence.'
];

/**
 * Send and delete a bunch of messages
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;

    msg.delete();
    for (let i = 0; i < TO_DELETE; i++) {
        sendAndDelete(channel);
    }
}

function sendAndDelete(channel) {
    channel.send(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
        .then(msg => {
            msg.delete();
        });
}
