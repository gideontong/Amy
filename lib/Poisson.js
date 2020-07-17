// An implementation of the Poisson discrete distributions specifically for Amy
// Inspired by https://gist.github.com/nicolashery/5885280

// FIXME
class Poisson {
    static selectN(arr, n = 1) {
        if (n == 1) return arr[Math.floor(Math.random() * arr.length)];
        else if (n >= arr.length) return arr;
        else {
            // Based on https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
            arr.sort(() => Math.random() - 0.5);
            return arr.slice(0, n);
        }
    }

    static exponential(multiplier) {
        return -Math.log(Math.random()) * multiplier;
    }

    static geometric(multiplier) {
        return Math.floor(Poisson.exponential(multiplier));
    }
}

module.exports = Poisson;