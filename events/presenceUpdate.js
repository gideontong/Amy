// Activities are the following:
// newPresence.activities[0] -> Activity
// Activity.type -> {PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM_STATUS}
// Activity.name -> 1st line, main name
// Activity.state -> 3rd line in Rich Presence only
module.exports = async (oldPresence, newPresence) => {
    console.log(newPresence.activities[0].type + ' ' + newPresence.activities[0].name);
}