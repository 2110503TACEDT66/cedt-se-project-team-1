const Coupon = require('../models/Coupon');
const Massage = require('../models/Massage');
const User = require('../models/User');

const CustomerCoupon = require('../models/CustomerCoupon');
const { get } = require('mongoose');


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

const getCustomerCouponByUser = async (req, res) => {
    try{
        const customerCoupon = await CustomerCoupon.find({user: req.params.id});
        if(!customerCoupon){
            return res.status(404).json({ success: false, error: 'Customer coupon not found' });
        }
        res.status(200).json({ success: true, data: customerCoupon });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

const getCustomerCouponByMassage = async (req, res) => {
    const { massageId } = req.params;
    try {
        const customerCoupons = await CustomerCoupon.find({ massage: massageId, user: req.user.id }).populate('coupon user massage');
        if (customerCoupons.length === 0) {
            return res.status(404).json({ success: false, error: 'Customer coupons not found for the given massage' });
        }
        res.status(200).json({ success: true, count: customerCoupons.length, data: customerCoupons });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


const addCustomerCoupon = async (req, res) => {
    try {
        const customerCoupon = await CustomerCoupon.create(req.body);
        const pointDetect = await Coupon.findById(req.body.coupon);
        const CouponPoint = pointDetect.point;
        const user = await User.findById(req.body.user);
        const userPoint = user.point;
        const newPoint = userPoint - CouponPoint;
        if(newPoint < 0){
            return res.status(400).json({ success: false, error: 'Not enough point' });
        }else{
            const updatedUserPoint = await User.findByIdAndUpdate(req.body.user, { point: newPoint }, { new: true })
        }
        res.status(201).json({ success: true, data: customerCoupon });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Bad request' });
    }
}


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
    getCustomerCouponByUser,
    updateCustomerCoupon,
    deleteCustomerCoupon,
    getCustomerCouponByMassage
};
