const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    massageShop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Massage',
        required: true
    },
    point: {
        type: Number,
        required: [true, 'Please add a Number of point'],
        min: 0,
    },
    discount: {
        type: Number,
        required: [true, 'Please add a discount percentage'],
        min: 0,
        max: 100
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
        required: [true, 'Please add an expire date'],

    },
    usableUserType: {
        type: String,
        enum: ['user', 'member'],
        required: true
    }
});

CouponSchema.pre('findOneAndDelete', { document: true, query: false }, async function (next) {
    console.log(`CustomerCoupon being removed from coupon ${this._id}`);
    await this.model('CustomerCoupon').deleteMany({ coupon: this._id });
    next();
})

module.exports = mongoose.model('Coupon', CouponSchema);