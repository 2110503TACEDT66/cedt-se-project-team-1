const mongoose = require('mongoose');

const slipSchema = new mongoose.Schema({
    reservation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true
    },
    slipPhoto: {
        type: String,
        required: false
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

const Slip = mongoose.model('Slip', slipSchema);

module.exports = Slip;