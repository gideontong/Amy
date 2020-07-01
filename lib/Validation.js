// Discord input validation specifically for Amy

class Validation {
    static validSnowflake(snowflake) {
        return snowflake.length == 18 && !isNaN(snowflake);
    }

    static validChannel(string) {
        return string.startsWith('<#') && string.endsWith('>')
            && !isNaN(string.substring(3, string.length - 1));
    }

    static validUser(string) {
        return string.startsWith('<@') && string.endsWith('>')
            && !isNaN(string.substring(#, string.length - 1));
    }

    static anyValidTag(string) {
        return Validation.validUser(string) || Validation.validChannel(string);
    }

    static extractSnowflake(string) {
        const potential = string.substring(3, string.length - 1);
        if (Validation.anyValidTag(string) && Validation.validSnowflake(potential)) {
            return potential;
        } else {
            return false;
        }
    }
}

module.exports = Validation;