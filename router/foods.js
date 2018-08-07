const express = require('express');
const router = express.Router();
const Food = require('../model/food');

// get all the food
router.get('/foods', async (req, res, next) => {
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
router.get('/foods/:id', async (req, res, next) => {
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
router.post('/foods', async (req, res, next) => {
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
router.put('/foods/:id', async (req, res, next) => {
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
router.delete('/foods/:id', async (req, res, next) => {
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

module.exports = router;