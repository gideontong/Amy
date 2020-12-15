const { mongodb } = require('../config/secrets.json');
const Mongo = require('mongodb').MongoClient;

const uri = `mongodb+srv://${mongodb.username}:${mongodb.password}@${mongodb.domain}/${mongodb.database}?retryWrties=true&w=majority`;

/**
 * Member data and profile handling
 * @class
 */
class Member {
    static createProfile() {
        const database = new Mongo(uri, { useNewUrlParser: true });
        database.connect(err => {
            const collection = database.db('test').collection('devices');
            // perform actions on the collection object
            database.close();
        });
    }
}

module.exports = Member;