/**
 * Discord input validation for Amy
 * @class
 */
class Validation {
    /**
     * Returns whether or not a snowflake is valid
     * @param {Snowflake} snowflake Discord snowflake
     */
    static validSnowflake(snowflake) {
        return snowflake.length == 18 && !isNaN(snowflake);
    }

    /**
     * Returns whether or not a string represents a valid channel tag
     * @param {str} string Potential channel string
     */
    static validChannel(string) {
        return string.startsWith('<#') && string.endsWith('>');
    }

    /**
     * Returns whether or not a string represents a valid user tag
     * @param {str} string Potential user string
     */
    static validUser(string) {
        return string.startsWith('<@') && string.endsWith('>');
    }

    /**
     * Returns whether or not a string represents a valid Discord tag
     * @param {str} string Potential Discord tag
     */
    static anyValidTag(string) {
        return Validation.validUser(string) || Validation.validChannel(string);
    }

    /**
     * Extracts a snowflake from a tag, channel, or ID
     * @param {str} string A tag, channel, or ID
     */
    static extractSnowflake(string) {
        const potential = string.substring(2, string.length - 1);
        if (Validation.validSnowflake(string)) {
            return string;
        } else if (Validation.anyValidTag(string)) {
            if (Validation.validSnowflake(potential)) {
                return potential;
            } else if (Validation.validSnowflake(potential.substring(1))) {
                return potential.substring(1);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * Determines if the message sent should be ignored
     * @param {Message} message Message to be parsed
     * @param {str} prefix Ignore the prefix
     * @returns {boolean}
     */
    static isIgnored(message, prefix) {
        if (message.author.bot) return true;
        if (message.content.startsWith(prefix)) return false;
        let character = message.content.charCodeAt(0);
        return !((character > 47 && character < 58)
            || (character > 64 && character < 91)
            || (character > 96 && character < 123));
    }
}

module.exports = Validation;