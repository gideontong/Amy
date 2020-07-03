module.exports = async (oldPresence, newPresence) => {
    console.log(newPresence.activities[0].state + ' ' + newPresence.activities[0].name);
}