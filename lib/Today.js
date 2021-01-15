let timeZoneOffset = -7; // UTC-PST Timezone

/**
 * Datetime and snowflake calculations class
 * @class
 */
class Today {
    /**
     * Converts the snowflake to UTC time
     * @param {int} snowflake Snowflake in BigInt format
     */
    static milliseconds(snowflake) {
        return snowflake ? (snowflake / 4194304) + 1420070400000 : 0;
    }

    /**
     * Converts UTC time to a human-readable string
     * @param {int} milliseconds UTC time
     */
    static dateStringPST(milliseconds) {
        var date = new Date(milliseconds);
        return date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    }

    /**
     * Converts a snowflake to a human-readable string
     * @param {Snowflake} snowflake Discord Snowflake
     */
    static humanSnowflake(snowflake) {
        return Today.dateStringPST(Today.milliseconds(snowflake));
    }

    /**
     * Calculates the time since a day
     * @param {Date} date A date
     * @param {bool} reverse Whether or not to reverse the calculation
     */
    static timeSinceDate(date, reverse = false) {
        const now = new Date();
        if (reverse) {
            now.setHours(now.getHours() + timeZoneOffset);
            return Math.floor((date - now) / 1000);
        }
        return Math.floor((now - date) / 1000);
    }

    /**
     * Formats time to human readable
     * @param {Number} seconds Seconds
     * @param {Boolean} major Whether or not to use fast rounding
     * @returns {String} Human-readable time
     */
    static formatTime(seconds, major = false) {
        var returnString = '';
        function ending(number) { return (number > 1) ? 's, ' : ', '; }
        var years = Math.floor(seconds / 31536000);
        returnString += years ? years + ' year' + ending(years) : '';
        if (major && years) return returnString.slice(0, -2);
        var days = Math.floor((seconds %= 31536000) / 86400);
        returnString += days ? days + ' day' + ending(days) : '';
        if (major && days) return returnString.slice(0, -2);
        var hours = Math.floor((seconds %= 86400) / 3600);
        returnString += hours ? hours + ' hour' + ending(hours) : '';
        if (major && hours) return returnString.slice(0, -2);
        var minutes = Math.floor((seconds %= 3600) / 60);
        returnString += minutes ? minutes + ' minute' + ending(minutes) : '';
        if (major && minutes) return returnString.slice(0, -2);
        var seconds = seconds % 60;
        returnString += seconds ? seconds + ' second' + ending(seconds).charAt(0) : '';
        return seconds < 1 ? 'less than a second' : returnString;
    }

    /**
     * Returns a human-readable version of timeSinceDate
     * @param {Date} date A date
     * @param {Boolean} major Whether or not to use fast rounding
     * @returns {String} Human-readable time
     */
    static timeSinceDateString(date, major = false) {
        const timeSince = Today.timeSinceDate(date, major);
        var seconds = timeSince;
        return Today.formatTime(seconds);
    }

    /**
     * Calculates the time passed since a snowflake
     * @param {Snowflake} snowflake Discord snowflake
     */
    static timeSinceSnowflake(snowflake) {
        return Today.timeSinceDateString(Today.milliseconds(snowflake));
    }

    /**
     * Stably select N elements from an array
     * @param {Array} arr Array to select from
     * @param {int} n Number of elements to select
     */
    static selectN(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len) throw new RangeError(`selectN: not enough elements to select from`);
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }
}

module.exports = Today;