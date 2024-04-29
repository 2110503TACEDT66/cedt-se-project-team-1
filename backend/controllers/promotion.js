const Promotion = require('../models/Promotion');
// Get all promos
// Get all promotions
const getPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.find();
        res.status(200).json({ success: true, data: promotions });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
// Get promotion by ID
const getPromotion = async (req, res) => {
    const { id } = req.params;
    try {
        const promotion = await Promotion.findById(id);
        if (!promotion) {
            return res.status(404).json({ success: false, error: 'Promotion not found' });
        }
        res.status(200).json({ success: true, data: promotion });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Create a new promotion
const addPromotion = async (req, res) => {
    try {
        const promotion = await Promotion.create(req.body);
        res.status(201).json({ success: true, data: promotion });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete promotion by ID
const deletePromotion = async (req, res) => {
    const { id } = req.params;
    try {
        const promotion = await Promotion.findByIdAndDelete(id);
        if (!promotion) {
            return res.status(404).json({ success: false, error: 'Promotion not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Update promotion by ID
const updatePromotion = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPromotion = await Promotion.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPromotion) {
            return res.status(404).json({ success: false, error: 'Promotion not found' });
        }
        res.status(200).json({ success: true, data: updatedPromotion });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

module.exports = {
    getPromotions,
    getPromotion,
    addPromotion,
    updatePromotion,
    deletePromotion
};
