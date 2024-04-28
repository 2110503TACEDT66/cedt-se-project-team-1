const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    apptDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    massage: {
        type: mongoose.Schema.ObjectId,
        ref: 'Massage',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    price : {
        type: Number,
        required: true
        
    }
});

module.exports = mongoose.model('Reservation', ReservationSchema);