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
    // Pass major=true for fast rounding
    static timeSinceDateString(date, major = false) {
        const timeSince = Today.timeSinceDate(date);
        var seconds = timeSince;
        var returnString = '';
        function ending(number) { return (number > 1) ? 's, ' : ', '; }
        var years = Math.floor(seconds / 31536000);
        returnString += years ? years + ' year' + ending(years) : '';
        if (major && years) return returnString;
        var days = Math.floor((seconds %= 31536000) / 86400);
        returnString += days ? days + ' day' + ending(days) : '';
        if (major && days) return returnString;
        var hours = Math.floor((seconds %= 86400) / 3600);
        returnString += hours ? hours + ' hour' + ending(hours) : '';
        if (major && hours) return returnString;
        var minutes = Math.floor((seconds %= 3600) / 60);
        returnString += minutes ? minutes + ' minute' + ending(minutes) : '';
        if (major && minutes) return returnString;
        var seconds = seconds % 60;
        returnString += seconds ? seconds + ' second' + ending(seconds).charAt(0) : '';
        return timeSince < 1 ? 'less than a second' : returnString;
    }

    static timeSinceSnowflake(snowflake) {
        return Today.timeSinceDateString(Today.milliseconds(snowflake));
    }

    // Selects n elements from an array randomly, stable and non-destructive
    // See: https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array
    // Not the same as selectN in Poisson, which is unstable and desctrutive, but more optimized for speed/memory
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

    // Always returns an array, but you can pass it a string or an array of strings
    // Turns user-input times into human-readable time slots
    static formatTimes(times) {
        function formatTime(time) {
            let now = new Date();
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
            return "at " + now.getHours() + ", in " + Today.timeSinceDateString(now.valueOf(), major=true);
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