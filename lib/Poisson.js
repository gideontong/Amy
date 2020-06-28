// An implementation of the Poisson discrete distributions specifically for Amy
// Inspired by https://gist.github.com/nicolashery/5885280

class Poisson {
    static exponential() {
        return -Math.log(Math.random());
    }

    static geometric() {
        return Math.floor(this.exponential());
    }
}

module.exports = Poisson;