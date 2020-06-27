// An implementation of snowflake calculations specifically for Amy

class Today {
    static convertSnowflake(snowflake) {
        return new Date(snowflake ? (snowflake / 4194304) + 1420070400000 : 0);
    }

    static dateStringPST(date) {
        return date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    }

    // Returns seconds between date and now
    static timeSinceDate(date) {
        const now = new Date.now();
        return Math.floor((now - date) / 1000);
    }

    // Returns a human-readable version of timeSinceDate()
    // See: https://stackoverflow.com/questions/8211744/convert-time-interval-given-in-seconds-into-more-human-readable-form
    static timeSinceDateString(date) {
        const seconds = self.timeSinceDate(date);
        var returnString = '';
        function ending(number) { return (number > 1) ? 's, ' : ''; }
        var years = Math.floor(seconds / 31536000);
        returnString += years ? years + ' year' + ending(years) : '';
        var days = Math.floor((seconds %= 31536000) / 86400);
        returnString += days ? days + ' day' + ending(days) : '';
        var hours = Math.floor((seconds %= 86400) / 3600);
        returnString += hours ? hours + ' hour' + ending(hours) : '';
        var minutes = Math.floor((seconds %= 3600) / 60);
        returnString += minutes ? minutes + ' minute' + ending(minutes) : '';
        var seconds = seconds % 60;
        returnString += seconds ? seconds + ' second' + ending(seconds)[0] : '';
        return seconds < 1 ? 'less than a second' : returnString;
    }
}

module.exports = Today; 