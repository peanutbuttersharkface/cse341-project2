const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 3000;


//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app
   .use(bodyParser.json())
   .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
         'Access-Control-Allow-Headers',
         'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
      );
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      next();
});
app.use('/', require('./routes'));

//process.on('uncaughtException', (err, origin) => {
//    console.log(process.stderr.fd, `Caught exception: ${err}\n`, `Exception origin: ${origin}`);
//});
     

mongodb.initDb((err) =>{
   if(err) {
      console.log(err);
   } else {
       app.listen(port);
       console.log(`Database is listening and node Running on port ${port}`); 
   }
});

   
      



