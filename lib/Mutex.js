/**
 * Prevents race conditions by queueing tasks
 * @class
 * @author Gideon Tong <gideon@gideontong.com>
 */
class Mutex {
    mutex = Promise.resolve();

    lock() {
        let begin = unlock => {};
        this.mutex = this.mutex.then(() => {
            return new Promise(begin);
        });
        return new Promise(res => {
            begin = res;
        });
    }

    async dispatch(fn) {
        const unlock = await this.lock();
        try {
            return await Promise.resolve(fn());
        } finally {
            unlock();
        }
    }
}

module.exports = Mutex;