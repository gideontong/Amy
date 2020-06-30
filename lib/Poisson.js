// An implementation of the Poisson discrete distributions specifically for Amy
// Inspired by https://gist.github.com/nicolashery/5885280

// FIXME
class Poisson {
    static exponential(multiplier) {
        return -Math.log(Math.random()) * multiplier;
    }

    static geometric(multiplier) {
        return Math.floor(Poisson.exponential(multiplier));
    }
}

module.exports = Poisson;