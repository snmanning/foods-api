const express = require('express');
const server = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet')

// set up the environment variables
dotenv.config();

// connect to the database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

// set up the port
const port = process.env.PORT || 7007;

//power ups (middleware)
server.use(helmet());
server.use(morgan('combined'));
server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded({extended:true}));


// models
const Food = mongoose.model('Food', { type: String, color: String, weight: Number });

// routes
// get all the food
server.get('/foods', async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json({
            "foods": foods
        })
    } catch(err) {
        res.status(500).json({
            msg: "Uh oh...the fridge light is out..."
        });
    }
});
// get one special food by id
server.get('/foods/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const foods = await Food.find({ _id: id });
        res.status(200).json({
            foods: foods
        })
    } catch (err) {
        res.status(500).json({
            msg: 'someone ate it...'
        });
    }
});
// create a new food
server.post('/foods', async (req, res) => {
    const { type, color, weight } = req.body;
    try {
        const food = new Food({ type, color, weight });
            await food.save();
            res.status(200).json({
                msg: 'placed in the tupperware',
                food
            })
    } catch (err) {
        res.status(500).json({
            msg: 'did not get put away'
        });
    }
});
// update one special food by id
server.put('/foods/:id', async (req, res) => {
    const { id } = req.params;
    const { type, color, weight } = req.body;
    try {
        const updatedFood = await Food.findByIdAndUpdate(id, { type, color, weight }, {new:true});
        res.status(200).json({
            msg: 'update successful',
            food: updatedFood
        })
    } catch (err) {
        res.status(500).json({
            msg: 'nothing happened..'
        });
    }
});
// delete one special food by id
server.delete('/foods/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Food.findByIdAndRemove(id);
        res.status(200).json({
            msg: 'the leftovers have been removed'
        })
    } catch (err) {
        res.status(500).json({
            msg: 'you did not throw that away yet'
        });
    }
});

// kick it off
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
})