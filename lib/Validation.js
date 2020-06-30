// Discord input validation specifically for Amy

class Validation {
    static validSnowflake(snowflake) {
        return snowflake.length == 18 && !isNaN(snowflake);
    }
}

module.exports = Validation;