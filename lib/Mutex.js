/**
 * Prevents race conditions by queueing tasks
 * @class
 * @author Gideon Tong <gideon@gideontong.com>
 */
class Mutex {
    mutex = Promise.resolve();

    /**
     * Locks the mutex to complete a transaction
     */
    lock() {
        let begin = unlock => {};
        this.mutex = this.mutex.then(() => {
            return new Promise(begin);
        });
        return new Promise(res => {
            begin = res;
        });
    }

    /**
     * Begins a mutex lock with a function parameter
     * @param {function} fn 
     */
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