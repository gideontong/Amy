// An implementation of snowflake calculations specifically for Amy

class Today {
    static milliseconds(snowflake) {
        return snowflake ? (snowflake / 4194304) + 1420070400000 : 0;
    }

    static dateStringPST(milliseconds) {
        var date = new Date(milliseconds);
        return date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    }

    static humanSnowflake(snowflake) {
        return Today.dateStringPST(Today.milliseconds(snowflake));
    }

    // Returns seconds between date and now
    static timeSinceDate(date) {
        const now = new Date();
        return Math.floor((now - date) / 1000);
    }
    
    // Returns a human-readable version of timeSinceDate()
    // See: https://stackoverflow.com/questions/8211744/convert-time-interval-given-in-seconds-into-more-human-readable-form
    static timeSinceDateString(date) {
        const timeSince = Today.timeSinceDate(date);
        var seconds = timeSince;
        var returnString = '';
        function ending(number) { return (number > 1) ? 's, ' : ', '; }
        var years = Math.floor(seconds / 31536000);
        returnString += years ? years + ' year' + ending(years) : '';
        var days = Math.floor((seconds %= 31536000) / 86400);
        returnString += days ? days + ' day' + ending(days) : '';
        var hours = Math.floor((seconds %= 86400) / 3600);
        returnString += hours ? hours + ' hour' + ending(hours) : '';
        var minutes = Math.floor((seconds %= 3600) / 60);
        returnString += minutes ? minutes + ' minute' + ending(minutes) : '';
        var seconds = seconds % 60;
        returnString += seconds ? seconds + ' second' + ending(seconds).charAt(0) : '';
        return timeSince < 1 ? 'less than a second' : returnString;
    }

    static timeSinceSnowflake(snowflake) {
        return Today.timeSinceDateString(Today.milliseconds(snowflake));
    }
}

module.exports = Today;