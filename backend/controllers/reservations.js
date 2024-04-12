const Reservation = require('../models/Reservation');
const Massage = require('../models/Massage');

exports.getReservations = async (req, res, next) => {
    let query;
    if (req.user.role !== 'admin') {
        query = Reservation.find({ user: req.user.id }).populate({
            path: 'massage',
            select: 'name province tel picture'
        })
    } else {
        if (req.params.massageId) {
            query = Reservation.find({ massage: req.params.massageId }).populate({
                path: 'massage',
                select: 'name province tel picture'
            })
        } else {
            query = Reservation.find().populate({
                path: 'massage',
                select: 'name province tel picture'
            })
        }
    }
    try {
        const reservations = await query;
        res.status(200).json({ success: true, count: reservations.length, data: reservations });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Cannot find Reservation" });
    }
}

exports.getReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate({
            path: 'massage',
            select: 'name province tel picture'
        });

        if (!reservation) {
            return res.status(404).json({ success: false, message: `No reservation with the id of ${req.params.id}` });
        }
        res.status(200).json({ success: true, data: reservation });
    } catch (err) {
        res.status(500).json({ success: false, message: "Cannot find reservation" });
    }
}

exports.addReservation = async (req, res, next) => {
    try {
        req.body.massage = req.params.massageId;
        const massage = await Massage.findById(req.params.massageId);

        if (!massage) {
            return res.status(404).json({ success: false, message: `No massage with the id of ${req.params.massageId}` });
        }
        console.log(req.body);

        req.body.user = req.user.id;

        const existedReservations = await Reservation.find({ user: req.user.id });

        if (existedReservations.length >= 3 && req.user.role !== 'admin') {
            return res.status(400).json({ success: false, message: `The user with ID ${req.user.id} has already made 3 reservations` });
        }
        const reservation = await Reservation.create(req.body);
        res.status(200).json({ success: true, data: reservation });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Cannot find massage" });
    }
}

exports.updateReservation = async (req, res, next) => {
    try {
        let reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ success: false, message: `No reservation with the id of ${req.params.id}` });
        }

        if (reservation.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: `User ${req.user.id} is not authorized to update this reservation` });
        }

        reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: reservation });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Cannot update reservation" });
    }
}

exports.deleteReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ success: false, message: `No reservation with the id of ${req.params.id}` });
        }

        if (reservation.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: `User ${req.user.id} is not authorized to delete this bootcamp` });
        }

        await reservation.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: "Cannot delete reservation" });
    }
}