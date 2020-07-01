// Discord input validation specifically for Amy

class Validation {
    static validSnowflake(snowflake) {
        return snowflake.length == 18 && !isNaN(snowflake);
    }

    static validChannel(string) {
        return string.startsWith('<#') && string.endsWith('>') && !isNaN(string.substring(3, string.length - 1));
    }

    static extractSnowflake(string) {
        if (Validation.validChannel(string)) {
            return string.substring(3, string.length - 1);
        } else {
            return false;
        }
    }
}

module.exports = Validation;