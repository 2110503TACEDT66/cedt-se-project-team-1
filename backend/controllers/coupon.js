const Coupon = require('../models/Coupon');

// Get all coupons
const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json({ success: true, data: coupons });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Get coupon by ID
const getCouponById = async (req, res) => {
    const { id } = req.params;
    try {
        const coupon = await Coupon.findById(id);
        if (!coupon) {
            return res.status(404).json({ success: false, error: 'Coupon not found' });
        }
        res.status(200).json({ success: true, data: coupon });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Create a new coupon
const createCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.create(req.body);
        res.status(201).json({ success: true, data: coupon });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete coupon by ID
const deleteCouponById = async (req, res) => {
    const { id } = req.params;
    try {
        const coupon = await Coupon.findById(id);
        if (!coupon) {
            return res.status(404).json({ success: false, error: 'Coupon not found' });
        }
        await coupon.remove();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

module.exports = {
    getCoupons,
    getCouponById,
    createCoupon,
    deleteCouponById
};
