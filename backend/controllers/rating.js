const Rating = require('../models/Rating');
const Massage = require('../models/Massage.js');
const Reservation = require('../models/Reservation.js');
const mongoose = require('mongoose');

// Get all ratings
const getRatings = async (req, res) => {
    let query;
    if(req.user.role === 'user') {
		query = Rating.find({ user: req.user.id }).populate({
			path: 'massageShop',
			select: 'serviceRatings transportRating priceRating hygieneRating overallRating comment'
		});
    }else if(req.user.role === 'shopOwner') {
        query = Rating.find({ massageShop: req.user.id }).populate({
            path: 'massageShop',
            select: 'serviceRatings transportRating priceRating hygieneRating overallRating comment'
        });
    }else {
        if (req.params.massageShopId) {
            query = Rating.find({ massageShop: req.params.massageShopId }).populate({
                path: 'massageShop',
                select: 'serviceRatings transportRating priceRating hygieneRating overallRating comment'
            });
        } else {
            query = Rating.find().populate({
                path: 'massageShop',
                select: 'serviceRatings transportRating priceRating hygieneRating overallRating comment'
            });
        }
    }
    try {
        const ratings = await query
        res.status(200).json({ success: true,count: ratings.length, data: ratings });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Cannot find Rating' });
    }
};

// Get rating by ID
const getRating = async (req, res) => {
    const { id } = req.params;
    try {
        const rating = await Rating.findById(id);
        if(req.user.role !== rating.user.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }
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
    const { serviceRating, transportRating, priceRating, hygieneRating, comment } = req.body;
    const overallRating = (serviceRating + transportRating + priceRating + hygieneRating ) /4.0
    try {
        const updatedRating = await Rating.findByIdAndUpdate(id, { serviceRating, transportRating, priceRating, hygieneRating, overallRating, comment }, { new: true });
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


        const { serviceRating, transportRating, priceRating, hygieneRating, comment } = req.body;
        const overallRating = (serviceRating + transportRating + priceRating + hygieneRating) / 4;

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
