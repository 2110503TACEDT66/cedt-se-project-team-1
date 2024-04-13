const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    ratingId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Rating',
        required: true
    },
    reason:{
        type: String,
        required: true,
        default: "No reason given"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', reportSchema);
