// Activities are the following:
// newPresence.activities -> Array<Activity>
// Activity.type -> {PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM_STATUS}
// Activity.name -> 1st line, main name
// Activity.state -> 3rd line in Rich Presence only
// Activity.details -> main text when type=CUSTOM_STATUS
module.exports = async (oldPresence, newPresence) => {
    console.log(newPresence.activities[0].type + ' ' + newPresence.activities[0].name + ' ' + newPresence.activities[0].details);
}