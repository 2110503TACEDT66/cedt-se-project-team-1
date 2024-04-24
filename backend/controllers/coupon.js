const Coupon = require('../models/Coupon');
const Massage = require('../models/Massage')
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
const getCoupon= async (req, res) => {
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
const addCoupon = async (req, res) => {
    try {
        const massageShop = await Massage.findById(req.params.massageShopId);
        if (!massageShop) {
            return res.status(404).json({
                success: false,
                message: `No massageShop with the id of ${req.params.massageShopId}`
            });
        }
        req.body.massageShop = req.params.massageShopId;
        
        // Set expireAt to current time
        const {expireAt} = req.body;
        if(!expireAt){
            req.body.expireAt = new Date();
        }

        const coupon = await Coupon.create(req.body);
        res.status(201).json({ success: true, data: coupon });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


// Delete coupon by ID
const deleteCoupon = async (req, res) => {
    const { id } = req.params;
    try {
        const coupon = await Coupon.findByIdAndDelete(id);
        if (!coupon) {
            return res.status(404).json({ success: false, error: 'Coupon not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const updateCoupon = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const {discount, coverage, expireAt, usableUserType} = req.body;
        const updateFields = {};
        if (discount) updateFields.discount = discount;
        if (coverage) updateFields.coverage = coverage;
        if (expireAt) updateFields.expireAt = expireAt;
        if (usableUserType) updateFields.usableUserType = usableUserType;
        
        const updatedCoupon = await Coupon.findByIdAndUpdate(id, updateFields, { new: true });
      
        if (!updatedCoupon) {
            console.log("here");
            return res.status(404).json({ success: false, error: 'Coupon not found' });
            
        }
        res.status(200).json({ success: true, data: updatedCoupon });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

module.exports = {
    getCoupons,
    getCoupon,
    addCoupon,
    updateCoupon,
    deleteCoupon
};
