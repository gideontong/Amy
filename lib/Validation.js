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
}

module.exports = Validation;