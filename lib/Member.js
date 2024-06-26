const { mongodb } = require('../config/secrets.json');
const Mongo = require('mongodb').MongoClient;

const uri = `mongodb+srv://${mongodb.username}:${mongodb.password}@${mongodb.domain}/?retryWrties=true&w=majority`;
const undefinedError = 'Something strange happened. Contact the bot author for help!';

/**
 * Member data and profile handling
 * @class
 */
class Member {
    /**
     * Retrives a profile from the database
     * @param {String} snowflake Discord user snowflake
     * @returns {String} Error if exists, null if success
     * @callback callback Success function to return the profile to
     */
    static async getProfile(snowflake, callback) {
        if (!(snowflake && callback)) {
            console.error('Member.getProfile is missing arguments!');
            return undefinedError;
        }
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne({
                snowflake: snowflake
            });
            if (!profile) {
                await Member.createProfile(snowflake);
                Member.getProfile(snowflake, callback);
            } else {
                callback(profile);
            }
            database.close();
        });
    }

    /**
     * Creates a new profile entry in the database
     * @param {String} snowflake Discord user snowflake
     * @returns {String} Error if exists, null if success
     */
    static async createProfile(snowflake) {
        if (!snowflake) {
            console.error('Member.createProfile is missing arguments!');
            return undefinedError;
        }
        const now = new Date();
        const profile = {
            snowflake: snowflake,
            inventory: [],
            achievements: [],
            timezone: 'America/Los_Angeles',
            premium: {
                expiry: now
            },
            statistics: {
                messages: 0,
                edited: 0,
                deleted: 0,
                reactions: 0,
                commands: {
                    count: 0,
                    usage: {}
                },
                work: {
                    total: 0,
                    hours: {}
                }
            },
            economy: {
                money: 100,
                earned: 0,
                spent: 0,
                job: 'unemployed'
            },
            cooldowns: {}
        };
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const find = await collection.findOne({
                snowflake: snowflake
            });
            if (!find) {
                const result = await collection.insertOne(profile);
                if (result.insertedCount != 1) {
                    console.error(`Tried to create profile ${snowflake}, failed!`);
                }
            }
            database.close();
        });
    }

    /**
     * Updates a user profile with counts
     * @param {String} snowflake Discord snowflake
     * @param {String} action Discord action
     * @returns {String} Error if exists, null if success
     */
    static async countAction(snowflake, action) {
        if (!(snowflake && action)) {
            console.error('Member.countAction is missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        let update;
        switch (action) {
            case 'message':
                update = {
                    $inc: {
                        "statistics.messages": 1
                    }
                };
                break;
            case 'edit':
                update = {
                    $inc: {
                        "statistics.edited": 1
                    }
                };
                break;
            case 'delete':
                update = {
                    $inc: {
                        "statistics.deleted": 1
                    }
                };
                break;
            case 'react':
                update = {
                    $inc: {
                        "statistics.reactions": 1
                    }
                };
                break;
            default:
                break;
        }
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne({
                snowflake: snowflake
            });
            if (!profile) {
                await Member.createProfile(snowflake);
                Member.countAction(snowflake, action);
            } else {
                const result = await collection.updateOne(filter, update);
            }
            database.close();
        });
    }

    /**
     * Counts whenever a user uses a command (doesn't check if valid command)
     * @param {String} snowflake Discord user snowflake
     * @param {String} command Command used
     * @returns {String} Error if exists, null if success
     */
    static async countCommand(snowflake, command) {
        if (!(snowflake && command)) {
            console.error('Member.countCommand is missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        const property = `statistics.commands.usage.${command}`;
        let update = {
            $inc: {
                "statistics.commands.count": 1
            }
        };
        update.$inc[property] = 1;
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne({
                snowflake: snowflake
            });
            if (!profile) {
                await Member.createProfile(snowflake);
                Member.countCommand(snowflake, command);
            } else {
                const result = await collection.updateOne(filter, update);
            }
            database.close();
        });
    }

    /**
     * Sets the timezone of the user
     * @param {String} snowflake Discord user snowflake
     * @param {String} timezone Timezone tzdata string
     * @returns {String} Error if exists, null if success
     */
    static async setTimezone(snowflake, timezone) {
        if (!(snowflake && command)) {
            console.error('Member.setTimezone is missing arguments!');
            return undefinedError;
        }
        try {
            const { timeZone: tz } = Intl.DateTimeFormat(undefined, {
                timeZone: timezone
            }).resolvedOptions();
            const filter = {
                snowflake: snowflake
            };
            const update = {
                $set: {
                    timezone: tz
                }
            };
            const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            database.connect(async err => {
                const collection = database.db(mongodb.database).collection('profiles');
                const profile = await collection.findOne({
                    snowflake: snowflake
                });
                if (!profile) {
                    await Member.createProfile(snowflake);
                    Member.setTimezone(snowflake, timezone);
                } else {
                    const result = await collection.updateOne(filter, update);
                }
                database.close();
            });
        } catch (err) {
            return 'That is not a valid timezone! To find your timezone name, try a website like https://www.zeitverschiebung.net/en/';
        }
    }

    /**
     * Adds an achievement to a user
     * @param {String} snowflake Discord user snowflake
     * @param {String} achievement Achievement ID to add
     * @returns {String} Error if failed, null otherwise
     */
    static async addAchievement(snowflake, achievement) {
        // TODO: Verify achievement is correct ID
        if (!(snowflake && achievement)) {
            console.error('Member.addAchievement is missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        const update = {
            $addToSet: {
                achievements: achievement
            }
        };
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne({
                snowflake: snowflake
            });
            if (!profile) {
                await Member.createProfile(snowflake);
                Member.addAchievement(snowflake, achievement);
            } else {
                const result = await collection.updateOne(filter, update);
            }
            database.close();
        });
    }

    /**
     * Removes the specified achievement from the user
     * @param {String} snowflake Discord user snowflake
     * @param {String} achievement Achievement ID
     * @returns {String} Only returns if failed
     */
    static async removeAchievement(snowflake, achievement) {
        if (!(snowflake && achievement)) {
            console.error('Member.removeAchievement is missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        const update = {
            $pullAll: {
                achievements: [achievement]
            }
        };
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne({
                snowflake: snowflake
            });
            if (!profile) {
                await Member.createProfile(snowflake);
                Member.removeAchievement(snowflake, achievement);
            } else {
                const result = await collection.updateOne(filter, update);
            }
            database.close();
        });
    }

    /**
     * Toggles an achievement for a user
     * @param {String} snowflake Discord user snowflake
     * @param {String} achievement Achievement ID
     * @returns {String} Only returns if fails
     */
    static async toggleAchievement(snowflake, achievement) {
        // TODO: Verify achievement is an actual achievement
        if (!(snowflake && achievement)) {
            console.error('Member.toggleAchievement is missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne(filter);
            if (profile) {
                if (profile.achievements.includes(achievement)) {
                    await collection.updateOne(filter, {
                        $pullAll: {
                            achievements: [achievement]
                        }
                    });
                } else {
                    await collection.updateOne(filter, {
                        $addToSet: {
                            achievements: achievement
                        }
                    });
                }
            } else {
                await Member.createProfile(snowflake);
                Member.toggleAchievement(snowflake, achievement);
            }
            database.close();
        });
    }

    /**
     * Get user balance
     * @param {String} snowflake Discord user snowflake
     * @param {function} callback Calls back with user balance
     * @returns {String} Error message if it fails
     */
    static async getBalance(snowflake, callback) {
        if (!(snowflake && callback)) {
            console.error('Member.getBalance is missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne(filter);
            if (profile) {
                callback(profile.economy.money);
            } else {
                await Member.createProfile(snowflake);
                callback(0);
            }
            database.close();
        });
    }

    /**
     * Updates a user balance by an offset
     * @param {String} snowflake Discord user snowflake
     * @param {Number} amount Amount to adjust balance by
     * @param {function} callback Callback function if desired
     * @param {Boolean} allowNegativeBalance If the balance can be negative
     * @returns {String} on error
     */
    static async updateBalance(snowflake, amount, callback = null, allowNegativeBalance = false) {
        if (!(snowflake && amount >= 0)) {
            console.error('Member.updateBalance is missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne(filter);
            if (profile) {
                if (!allowNegativeBalance && profile.economy.money < -amount) {
                    amount = profile.economy.money;
                }
                const update = {
                    $inc: {
                        "economy.money": amount,
                        "economy.earned": amount > 0 ? amount : 0,
                        "economy.spent": amount < 0 ? -amount : 0
                    }
                };
                await collection.updateOne(filter, update);
                if (callback) callback(profile.economy.money + amount);
            } else {
                await Member.createProfile(snowflake);
                Member.updateBalance(snowflake, amount, callback);
            }
            database.close();
        });
    }

    /**
     * Updates a user balance
     * @param {String} snowflake Discord user snowflake
     * @param {Number} amount Amount to set balance to
     * @param {function} callback Callback function on success
     */
    static async setBalance(snowflake, amount, callback = null) {
        if (!(snowflake && amount)) {
            console.error('Member.setBalance is missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        const update = {
            $set: {
                "economy.money": amount
            }
        };
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne(filter);
            if (profile) {
                await collection.updateOne(filter, update);
                if (callback) callback(amount);
            } else {
                await Member.createProfile(snowflake);
                Member.updateBalance(snowflake, amount, callback);
            }
            database.close();
        });
    }

    /**
     * Transfers money from one player to another, 0 if impossible
     * @param {String} payor Discord snowflake of payor
     * @param {String} payee Discord snowflake of payee
     * @param {Number} amount Amount being paid
     * @param {Boolean} allowNegativeBalance Whether or not the payor can go into debt
     * @param {function} callback Callback function with amount updated
     */
    static async transferBalance(payor, payee, amount, allowNegativeBalance = false, callback = null) {
        if (amount < 0) {
            return 'Cannot transfer a negative amount.';
        }
        if (!(payor && payee && amount)) {
            console.error('Member.transferBalance is missing arguments!');
            return undefinedError;
        }
        const payorFilter = {
            snowflake: payor
        };
        const payeeFilter = {
            snowflake: payee
        };
        const payorUpdate = {
            $inc: {
                "economy.money": -amount,
                "economy.spent": amount
            }
        };
        const payeeUpdate = {
            $inc: {
                "economy.money": amount,
                "economy.earned": amount
            }
        };
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const payorProfile = await collection.findOne(payorFilter);
            const payeeProfile = await collection.findOne(payeeFilter);
            if (!payeeProfile) {
                await Member.createProfile(payee);
                Member.transferBalance(payor, payee, amount, allowNegativeBalance, callback);
            } else {
                if (payorProfile) {
                    if (amount > payorProfile.economy.money && !allowNegativeBalance) {
                        if (callback) callback(0)
                    } else {
                        await collection.updateOne(payorFilter, payorUpdate);
                        await collection.updateOne(payeeFilter, payeeUpdate);
                        if (callback) callback(amount);
                    }
                } else {
                    await Member.createProfile(payor);
                    if (callback) callback(0);
                }
            }
            database.close();
        });
    }

    /**
     * Executes callback with no arguments if cooldown is not in effect
     * @param {String} snowflake Discord snowflake
     * @param {String} command Command executing
     * @param {function} callback Function to execute
     * @param {Date} date New date to set if success (default = in 24 hours)
     * @returns {String} Error if exists
     */
    static async checkCooldown(snowflake, command, callback, date = new Date(new Date().getTime() + 86400000)) {
        if (!(snowflake && command && callback)) {
            console.error('Member.checkCooldown is missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        let update = {
            $set: {}
        };
        update.$set[`cooldowns.${command}`] = date;
        const now = new Date();
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne(filter);
            if (profile) {
                if (!profile.cooldowns[command] || profile.cooldowns[command] < now) {
                    await collection.updateOne(filter, update);
                    callback();
                } else {
                    callback(true);
                }
            } else {
                await Member.createProfile(snowflake);
                callback();
            }
            database.close();
        });
    }

    /**
     * Sets the job of a member if the timer has expired, runs callback no mater what
     * @param {String} snowflake Discord snowflake
     * @param {function} callback Function to execute
     * @returns {String} Arbtirary error
     */
    static async setJob(snowflake, job, callback) {
        if (!(snowflake && job && callback)) {
            console.error('Member.setJob is missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        let tomorrow = new Date();
        tomorrow.setHours(tomorrow.getHours() + 12);
        const update = {
            $set: {
                'economy.job': job,
                'cooldowns.job': tomorrow
            }
        };
        const now = new Date();
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne(filter);
            if (profile) {
                await collection.updateOne(filter, update);
                callback([true, job, tomorrow]);
            } else {
                await Member.createProfile(snowflake);
                Member.setJob(snowflake, job, callback);
            }
            database.close();
        });
    }

    /**
     * Deletes the job (aka quitting)
     * @param {String} snowflake Discord snowflake
     * @param {function} callback Function to execute on success
     * @returns {String} Arbitrary error
     */
    static async deleteJob(snowflake, callback = null) {
        if (!snowflake) {
            console.error('Member.deleteJob is missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        const update = {
            $set: {
                'economy.job': 'unemployed'
            }
        };
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne(filter);
            if (profile) {
                await collection.updateOne(filter, update);
            } else {
                await Member.createProfile(snowflake);
            }
            if (callback) callback();
            database.close();
        });
    }

    /**
     * Adds to job time, if possible
     * @param {String} snowflake Discord snowflake
     * @param {String} job Job of user
     * @param {function} callback Function to execute, true if success
     * @returns {String} on error
     */
    static async addJobTime(snowflake, job, callback = null) {
        if (!(snowflake && job)) {
            console.error('Member.addJobTime is missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        var update = {
            $inc: {
                "statistics.work.total": 1
            }
        }
        update.$inc[`statistics.work.hours.${job}`] = 1;
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne(filter);
            if (profile) {
                await collection.updateOne(filter, update);
                if (callback) callback(true);
            } else {
                await Member.createProfile(snowflake);
                if (callback) callback(false);
            }
            database.close();
        });
    }

    /**
     * Checks a person's Premium status
     * @callback callback Sends back Boolean of premium status and Date of expiry
     * @param {String} snowflake Discord snowflake
     * @returns {String} on error
     */
    static async getPremium(callback, snowflake) {
        if (!(callback && snowflake)) {
            console.error('Member.getPremium is missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        const now = new Date();
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne(filter);
            if (profile) {
                const expiry = new Date(profile.premium.expiry);
                if (now < expiry) {
                    callback(true, expiry);
                } else {
                    callback(false, now);
                }
            } else {
                await Member.createProfile(snowflake);
                callback(false, now);
            }
            database.close();
        });
    }

    /**
     * Grants Premium
     * @callback callback Sends back Boolean of premium status and Date of expiry
     * @param {String} snowflake Discord snowflake
     * @param {Number} days Number of premium days to add, use -1 for lifetime
     */
    static async setPremium(callback, snowflake, days = 0) {
        if (!(callback && snowflake)) {
            console.error('Member.setPremium is missing arguments!');
            return undefinedError;
        }
        if (!days) {
            console.warn('Member.setPremium was given a 0-day update, calling Member.getPremium instead.');
            return Member.getPremium(callback, snowflake);
        }
        const filter = {
            snowflake: snowflake
        };
        const now = new Date();
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne(filter);
            if (profile) {
                let expiry = new Date(profile.premium.expiry);
                if (expiry < now) expiry = now;
                expiry.setDate(expiry.getDate() + days);
                const update = {
                    $set: {
                        'premium.expiry': expiry
                    }
                };
                await collection.updateOne(filter, update);
                callback(true, expiry);
            } else {
                await Member.createProfile(snowflake);
                Member.setPremium(callback, snowflake, days);
            }
            database.close();
        });
    }
}

module.exports = Member;