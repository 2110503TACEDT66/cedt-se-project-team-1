const mongoose = require('mongoose');

const CustomerCouponSchemas = new mongoose.Schema({
    coupon: {
        type: mongoose.Schema.ObjectId,
        ref: 'Coupon',
        required: true
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    massage:{
        type: mongoose.Schema.ObjectId,
        ref: 'Massage',
        required: true
    }
});

module.exports = mongoose.model('CustomerCoupon', CustomerCouponSchemas);