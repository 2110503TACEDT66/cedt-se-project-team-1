const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    massageShop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Massage',
        required: true
    },
    startAt: {
        type: Date,
        default: Date.now
    },
    expireAt: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Membership', MembershipSchema);