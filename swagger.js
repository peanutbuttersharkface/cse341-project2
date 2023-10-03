const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title:'Users Api',
        description:'Users Api'
    },
    host: 'project2-p30u.onrender.com',
    schemes:['https']  
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);