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
     * Returns a human-readable version of timeSinceDate
     * @param {Date} date A date
     * @param {bool} major Whether or not to use fast rounding
     */
    static timeSinceDateString(date, major = false) {
        const timeSince = Today.timeSinceDate(date, major);
        var seconds = timeSince;
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
        return timeSince < 1 ? 'less than a second' : returnString;
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

    /**
     * Format times into human-readable slots
     * @param {str} times Times to format
     */
    static formatTimes(times) {
        function formatTime(time) {
            let now = new Date();
            now.setHours(now.getHours() + timeZoneOffset); // Timezone offset
            time = time.trim();
            if (isNaN(time)) {
                if (time.includes(':')) {
                    let clockTime = time.split(':');
                    let iterations = 0;
                    checkIterations:
                        for (var i = 0; i < clockTime.length; i++) {
                            if (isNaN(clockTime[i])) continue;
                            iterations++;
                            switch (iterations) {
                                case 1:
                                    now.setHours(clockTime[i]);
                                    break;
                                case 2:
                                    now.setMinutes(clockTime[i]);
                                    break;
                                case 3:
                                    now.setMilliseconds(clockTime[i]);
                                    break checkIterations;
                            }
                        }
                    if (iterations == 0) {
                        // Handle : input was invalid
                        return time;
                    }
                } else if (time.endsWith('d') || time.endsWith('h') || time.endsWith('m')) {
                    let timeInt = parseInt(time);
                    if (isNaN(timeInt)) return time;
                    switch (time[time.length - 1]) {
                        case 'd':
                            now.setDate(now.getDate() + timeInt);
                            break;
                        case 'h':
                            now.setHours(now.getHours() + timeInt);
                            break;
                        case 'm':
                            now.setMinutes(now.getMinutes() + timeInt);
                            break;
                        default:
                            // Handle invalid inputs
                            return time;
                    }
                } else {
                    // Handle invalid inputs by fuzzing an integer
                    let timeInt = parseInt(time);
                    return isNaN(timeInt) ? time : formatTime(time);
                }
            } else {
                let parsedTime = parseInt(time)
                let hours = parsedTime <= 12 ? parsedTime + 12 : parsedTime
                if (hours > now.getHours()) {
                    now.setHours(hours); // 24 hours is auto-handled by Date()
                } else {
                    now.setHours(hours + 24);
                }
            }
            return "at " + (now.getHours() ? now.getHours() - 12: 12) + ", in " + Today.timeSinceDateString(now.valueOf(), true);
        }
        if (Array.isArray(times)) {
            let arr = []
            for (var i = 0; i < times.length; i++) {
                arr.push(formatTime(times[i]));
            }
            return arr;
        } else {
            return [formatTime(times)];
        }
    }
}

module.exports = Today;