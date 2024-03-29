const swaggerAutogen = require('swagger-autogen')({openapi:'3.0.0'});

const doc = {
  info: {
    title: 'Todo',
    description: 'A todo application'
  },
  host: 'localhost:5000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/route.js', ];
 

swaggerAutogen(outputFile, routes, doc);