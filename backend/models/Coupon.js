const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    massageShop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Massage',
        required: true
    },
    discount: {
        type: Number,
        required: [true, 'Please add a discount percentage'],
        min: 0
    },
    coverage: {
        type: Number,
        required: [true, 'Please add a coverage'],
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expireAt: {
        type: Date,
        required: [true, 'Please add an expire date']
    },
    usableUserType: {
        type: String,
        enum: ['user', 'member'],
        required: true
    }
});

module.exports = mongoose.model('Coupon', CouponSchema);