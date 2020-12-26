// An implementation of the Poisson discrete distributions specifically for Amy
// Inspired by https://gist.github.com/nicolashery/5885280

class MagicNumbers {
    /**
     * Generate log name
     */
    static generateLogName() {
        let date = new Date();
        return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate() + '.' +
            date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds() + '.log';
    }

    /**
     * Select N random elements from an array
     * @param {Array} arr Array
     * @param {Number} n Number of elements
     */
    static selectN(arr, n = 1) {
        if (n == 1) return arr[Math.floor(Math.random() * arr.length)];
        else if (n >= arr.length) return arr;
        else {
            arr.sort(() => Math.random() - 0.5);
            return arr.slice(0, n);
        }
    }

    /**
     * Shuffle an array in place using Fisher-Yates
     * @param {Array} arr Array to shuffle
     */
    static shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}

module.exports = MagicNumbers;