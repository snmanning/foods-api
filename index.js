const express = require('express');
const server = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// set up the environment variables
dotenv.config();

// connect to the database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

// set up the port
const port = process.env.PORT || 7007;

//power ups (middleware)


// models
const Food = mongoose.model('Food', { type: String, color: String, weight: Number });

// routes
// get all the food


// get one special food by id


// create a new food


// update one special food by id


// delete one special food by id


// kick it off
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
})