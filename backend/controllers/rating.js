const Rating = require('../models/Rating');
const Massage = require('../models/Massage.js');
const Reservation = require('../models/Reservation.js');
const mongoose = require('mongoose');

// Get all ratings
const getRatings = async (req, res) => {
    try {
        if (!req.params.massageShopId) {
            const ratings = await Rating.find();
            res.status(200).json({ success: true, data: ratings });
        }
        else {
            const massageShop = await Massage.findById(req.params.massageShopId);
            if (!massageShop) {
                return res.status(404).json({
                    success: false,
                    message: `No massageShop with the id of ${req.params.massageShopId}`
                });
            }

            const ratings = await Rating.find({ massageShop: req.params.massageShopId });
            res.status(200).json({ success: true, data: ratings });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Get rating by ID
const getRating = async (req, res) => {
    const { id } = req.params;
    try {
        const rating = await Rating.findById(id);
        if (!rating) {
            return res.status(404).json({ succes: false, error: 'Rating not found' });
        }
        res.status(200).json({ success: true, data: rating });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Update rating
const updateRating = async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    try {
        const updatedRating = await Rating.findByIdAndUpdate(id, { rating, comment }, { new: true });
        if (!updatedRating) {
            return res.status(404).json({ success: false, error: 'Rating not found' });
        }
        res.status(200).json({ success: true, data: updatedRating });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Delete rating
const deleteRating = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRating = await Rating.findByIdAndDelete(id);
        if (!deletedRating) {
            return res.status(404).json({ success: false, error: 'Rating not found' });
        }
        res.status(200).json({ success: true, message: 'Rating deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
// Add rating
const addRating = async (req, res) => {
    try {
        // Check if the massageShop exists
        const massageShop = await Massage.findById(
            req.params.massageShopId
        );
        if (!massageShop) {
            return res.status(404).json({
                success: false,
                message: `No massageShop with the id of ${req.params.massageShopId}`
            });
        }

        // Check if the user has reserved the massageShop
        const reservation = await Reservation.find({ user: req.user.id, massage: req.params.massageShopId })
        if (reservation.length === 0) {
            return res.status(400).json({
                succes: false,
                message: `The user with ID ${req.user.id} has not reserved this massage shop`
            })
        }

        // Check if the user has already rated the massageShop
        const aggregateResult = await Rating.aggregate([
            {
                $match: {
                    massage: new mongoose.Types.ObjectId(req.params.massageShopId),
                    user: new mongoose.Types.ObjectId(req.user.id)

                }
            }
        ]);
        if (aggregateResult.length > 0) {
            return res.status(400).json({
                success: false,
                message: `The user with ID ${req.user.id} has already rated this massage shop`
            })
        }

        console.log(req.body);


        const { serviceRating, transportRating, priceRating, hygieneRating, overallRating, comment } = req.body;

        // Create a new rating document
        const rating = new Rating({
            serviceRating,
            transportRating,
            priceRating,
            hygieneRating,
            overallRating,
            comment,
            user: req.user.id,
            massageShop: req.params.massageShopId
        });

        // Save the rating to MongoDB
        const savedRating = await rating.save();

        res.status(201).json({
            success: true,
            data: savedRating
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Cannot create Rating'
        })
    }
};

module.exports = {
    getRatings,
    getRating,
    updateRating,
    deleteRating,
    addRating
};