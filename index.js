const express = require('express');
const server = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const 

// set up the environment variables
dotenv.config();

// connect to the database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

// set up the port
const port = process.env.PORT || 7007;

//routes
const foodRouter = require('./router/foods');

//power ups (middleware)
server.use(helmet());
server.use(morgan('combined'));
server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded({extended:true}));

// routes
server.use(foodRouter);

// kick it off
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
})