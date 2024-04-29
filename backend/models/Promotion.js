const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    massageShop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Massage',
        required: true
    },
    //discuss later
    // discount: {
    //     type: Number,
    //     required: [true, 'Please add a discount percentage'],
    //     min: 0,
    //     max: 100
    // },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expireAt: {
        type: Date,
        required: [true, 'Please add an expire date'],
    },

    // discuss later
    // usableUserType: {
    //     type: String,
    //     enum: ['member'],
    //     required: true
    // }
});

module.exports = mongoose.model('Promotion', PromotionSchema);