const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const port = process.env.PORT || 3000;

const app = express();


app.use(bodyParser.json());
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   next();
});
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n`, `Exception origin: ${origin}`);
});
     
try {
    mongodb.initDb((err) =>{
        if (err){
            throw err;
        }
    });
} catch (err) {
    console.log(err);
    process.exit(1);
}


