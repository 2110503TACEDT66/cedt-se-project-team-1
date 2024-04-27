const Coupon = require('../models/Coupon');
const Massage = require('../models/Massage');
const User = require('../models/User');

const CustomerCoupon = require('../models/CustomerCoupon');


const getCustomerCoupons = async (req, res) => {
    try {
        const customerCoupons = await CustomerCoupon.find().populate('coupon user massage');
        res.status(200).json({ success: true, count: customerCoupons.length, data: customerCoupons });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


const getCustomerCoupon = async (req, res) => {
    const { id } = req.params;
    try {
        const customerCoupon = await CustomerCoupon.findById(id).populate('coupon user massage');
        if (!customerCoupon) {
            return res.status(404).json({ success: false, error: 'Customer coupon not found' });
        }
        res.status(200).json({ success: true, data: customerCoupon });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


const addCustomerCoupon = async (req, res) => {
    try {
        const customerCoupon = await CustomerCoupon.create(req.body);
        res.status(201).json({ success: true, data: customerCoupon });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Bad request' });
    }
};


const updateCustomerCoupon = async (req, res) => {
    const { id } = req.params;
    try {
        const customerCoupon = await CustomerCoupon.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!customerCoupon) {
            return res.status(404).json({ success: false, error: 'Customer coupon not found' });
        }
        res.status(200).json({ success: true, data: customerCoupon });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Bad request' });
    }
};

// @desc    Delete customer coupon by ID
// @route   DELETE /api/customer-coupons/:id
const deleteCustomerCoupon = async (req, res) => {
    const { id } = req.params;
    try {
        const customerCoupon = await CustomerCoupon.findByIdAndDelete(id);
        if (!customerCoupon) {
            return res.status(404).json({ success: false, error: 'Customer coupon not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

module.exports = {
    getCustomerCoupons,
    getCustomerCoupon,
    addCustomerCoupon,
    updateCustomerCoupon,
    deleteCustomerCoupon
};
