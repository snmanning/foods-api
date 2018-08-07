const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    type: {
        type: String,
        required: true
        },   
    color: {
        type: String,
        required: true
        }, 
    weight: {
        type: Number,
        min: 0,
        max: 10,
        required: true
        }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;