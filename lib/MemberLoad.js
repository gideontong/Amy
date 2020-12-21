const { calculateLevel } = require('./Achievement');
const { getProfile } = require('./Member');

const undefinedError = 'Something strange happened. Contact the bot author for help!';

/**
 * Takes care of functions involving member data
 * @class
 */
class MemberLoad {
    /**
     * Get user snowflake
     * @param {String} snowflake Discord user snowflake
     * @param {function} callback Callback if success
     * @returns {String} on failure
     */
    static getLevel(snowflake, callback) {
        if (!snowflake) {
            console.log('MemberLoad.getRank missing arguments, exiting.');
            return undefinedError;
        }
        getProfile(snowflake, function (profile) {
            const level = calculateLevel(profile.statistics.messages, profile.statistics.reactions, profile.statistics.commands.count)
            callback(level);
        });
    }
}

module.exports = MemberLoad;