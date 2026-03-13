const swaggerAutogen = require('swagger-autogen')();

const doc ={
    info: {
        title: 'Contacts Api',
        description: 'Contacts Api'
    },
    host: 'cse341-project1-nld0.onrender.com',
    schemes: ['https']
};

const outputfile = './swagger.json';
const endpointfiles = ['./routes/index.js'];

swaggerAutogen(outputfile, endpointfiles,doc);