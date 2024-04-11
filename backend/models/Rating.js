const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    serviceRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },    
    transportRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    priceRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    hygieneRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    comment: {
        type: String,
        required: true,
        default: "No comment"
    },
    user: {
        type: mongoose.Schema.ObjectId,
        refq: 'User',
        required: true
    },
    workingSpace: {
        type: mongoose.Schema.ObjectId,
        ref: 'WorkingSpace',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Rating', ratingSchema);
