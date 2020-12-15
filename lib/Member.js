const { mongodb } = require('../config/secrets.json');
const Mongo = require('mongodb').MongoClient;

const uri = `mongodb+srv://${mongodb.username}:${mongodb.password}@${mongodb.domain}/?retryWrties=true&w=majority`;

/**
 * Member data and profile handling
 * @class
 */
class Member {
    /**
     * Retrives a profile from the database
     * @param {str} snowflake Discord user snowflake
     * @param {function} callback Success function to return the profile to
     */
    static retriveProfile(snowflake, callback) {
        if (!(snowflake && callback)) {
            console.error('Tried to retrive a profile with missing arguments!');
            return;
        }
        const database = new Mongo(uri, { useNewUrlParser: true });
        database.connect(err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const profile = await collection.findOne({
                snowflake: snowflake
            });
            callback(profile);
            database.close();
        });
    }

    /**
     * Creates a new profile entry in the database
     * @param {str} snowflake Discord user snowflake
     */
    static createProfile(snowflake) {
        if (!snowflake) {
            console.error('Tried to create a profile with missing arguments!');
            return;
        }
        const profile = {
            snowflake: snowflake,
            achievements: [],
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
        const database = new Mongo(uri, { useNewUrlParser: true });
        database.connect(err => {
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
     * @param {str} snowflake Discord snowflake
     * @param {str} action Discord action
     */
    static countAction(snowflake, action) {
        if (!(snowflake && action)) {
            console.error('Tried to count an action with missing arguments!');
            return;
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
        const database = new Mongo(uri, { useNewUrlParser: true });
        database.connect(err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const result = await collection.updateOne(filter, update);
            database.close();
        });
    }

    /**
     * Counts whenever a user uses a command (doesn't check if valid command)
     * @param {str} snowflake Discord user snowflake
     * @param {str} command Command used
     */
    static countCommand(snowflake, command) {
        if (!(snowflake && command)) {
            console.error('Tried to count commands, missing arguments!');
            return;
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
        const database = new Mongo(uri, { useNewUrlParser: true });
        database.connect(err => {
            const collection = database.db(mongodb.database).collection('profiles');
            const result = await collection.updateOne(filter, update);
            database.close();
        });
    }

    static addAchievement(snowflake, achievement) {
    }

    static removeAchievement(snowflake, achievement) {
    }

    static toggleAchievement(snowflake, achievement) {
    }

    static modifyBalance(snowflake, amount) {
    }
}

module.exports = Member;