const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) =>{
    if(database) {
        console.log('Db is already initialized');
        return callback(null, database);
    }
    let MONGODB_URL;
    if(MONGODB_URL === undefined || MONGODB_URL === null){
        console.log('The variable is not initialized');
    }else{
        console.log('The variaable is initialized');
    }
    MongoClient.connect(process.env.MONGODB_URL)
    .then((client) =>{
       database = client;
       callback(null, database);
    })
    .catch((err) =>{
        callback(err);
    });
};

const getDatabase =() =>{
    if(!database){
        throw Error('Database not initialized')
    } 
    return database;
};

module.exports = {
    initDb,
    getDatabase
};