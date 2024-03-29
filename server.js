const express = require('express');
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser');
const http = require('http');
const router = require('./routes/route');
const app = express();
const swagger = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')


const PORT = 5000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//cors
app.use(cors());


// cwager
router.use('/docs', swagger.serve, swagger.setup(swaggerDocument));

app.use('/', router)

http.createServer(app).listen(PORT, ()=>{
    console.log("Server is running at Port:" +PORT);
})
