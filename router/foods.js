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
        next(err);
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
        next(err);
    }
});
// create a new food
router.post('/foods', async (req, res) => {
    const { type, color, weight } = req.body;
    try {
        const food = new Food({ type, color, weight });
            await food.save();
            res.status(201).json({
                msg: 'Entry saved',
                food
            })
    } catch (err) {
        next(err);
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
        next(err);
    }
});
// delete one special food by id
router.delete('/foods/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await Food.findByIdAndRemove(id);
        res.status(200).json({
            msg: 'Entry deleted'
        })
    } catch (err) {
            next(err);
    }
});

module.exports = router;