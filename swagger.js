const swaggerAutogen = require('swagger-autogen')();

const doc ={
    info: {
        title: 'Contacts Api',
        description: 'Contacts Api'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputfile = './swagger.json';
const endpointfiles = ['./routes/index.js'];

swaggerAutogen(outputfile, endpointfiles,doc);