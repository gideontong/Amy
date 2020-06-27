// An implementation of snowflake calculations specifically for Amy

class Today {
    static convertSnowflake(snowflake) {
        return new Date(snowflake ? (snowflake / 4194304) + 1420070400000 : 0);
    }

    static dateStringPST(date) {
        return date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    }
}

module.exports = Today;