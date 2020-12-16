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
     * @param {function} callback Success function to return the profile to
     * @returns {String} Erorr if exists, null if success
     */
    static async getProfile(snowflake, callback) {
        if (!(snowflake && callback)) {
            console.error('Tried to retrive a profile with missing arguments!');
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
            console.error('Tried to create a profile with missing arguments!');
            return undefinedError;
        }
        const profile = {
            snowflake: snowflake,
            achievements: [],
            timezone: 'America/Los_Angeles',
            premium: {
                status: false,
                expiry: 0
            },
            statistics: {
                messages: 0,
                edited: 0,
                deleted: 0,
                reactions: 0,
                commands: {
                    count: 0,
                    usage: {}
                }
            },
            economy: {
                money: 0,
                earned: 0,
                spent: 0
            }
        };
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const result = await collection.insertOne(profile);
            if (result.insertedCount != 1) {
                console.error(`Tried to create profile ${snowflake}, failed!`);
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
            console.error('Tried to count an action with missing arguments!');
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
            console.error('Tried to count commands, missing arguments!');
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
            console.error('Tried to set timezone, missing arguments!');
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
            console.error('Tried to add achievement, missing arguments!');
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
            console.error('Tried to remove achievement, missing arguments!');
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
            console.error('Tried to toggle achievement, missing arguments!');
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
            console.error('Tried to get balance, missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne(filter);
            if (profile && profile.economy && profile.economy.money) {
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
     */
    static async updateBalance(snowflake, amount, callback = null) {
        if (!(snowflake && amount)) {
            console.error('Tried to update balance, missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        const update = {
            $inc: {
                "profile.economy.money": amount
            }
        };
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne(filter);
            if (profile && profile.economy && profile.economy.money) {
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
            console.error('Tried to set balance, missing arguments!');
            return undefinedError;
        }
        const filter = {
            snowflake: snowflake
        };
        const update = {
            $set: {
                "profile.economy.money": amount
            }
        };
        const database = new Mongo(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        database.connect(async err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne(filter);
            if (profile && profile.economy && profile.economy.money) {
                await collection.updateOne(filter, update);
                if (callback) callback(profile.economy.money + amount);
            } else {
                await Member.createProfile(snowflake);
                Member.updateBalance(snowflake, amount, callback);
            }
            database.close();
        });
    }
}

module.exports = Member;