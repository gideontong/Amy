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
        if(!(snowflake && callback)) {
            console.warn('Tried to retrive a profile with missing arguments!');
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
            console.warn('Tried to create a profile with missing arguments!');
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
}

module.exports = Member;