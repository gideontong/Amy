// Discord input validation specifically for Amy

class Validation {
    static validSnowflake(snowflake) {
        return snowflake.length == 18 && !isNaN(snowflake);
    }

    static validChannel(string) {
        return string.startsWith('<#') && string.endsWith('>');
    }

    static validUser(string) {
        return string.startsWith('<@') && string.endsWith('>');
    }

    static anyValidTag(string) {
        return Validation.validUser(string) || Validation.validChannel(string);
    }

    // Extracts a snowflake from a tag, channel, or ID
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

    // Determines if the message sent should be ignored
    // message:   Discord message to scan
    // ignores:   strings to ignore
    // exception: string to keep in ignore
    static isIgnored(message, ignores, exception) {
        if (message.author.bot) return true;
        if (message.content.startsWith(exception)) return false;
        for (var i = 0; i < ignores.length; i++) {
            if (message.content.startsWith(ignores[i])) return true;
        }
        return false;
    }
}

module.exports = Validation;