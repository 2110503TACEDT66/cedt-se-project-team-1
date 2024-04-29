const express = require('express');
const { getCoupons, getCoupon, getCouponsByMassageShop, updateCoupon, deleteCoupon, addCoupon } = require('../controllers/coupon.js');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/:id')
    .get(protect, getCoupon)
    .put(protect, authorize('admin', 'shopOwner', 'user'), updateCoupon)
    .delete(protect, authorize('admin', 'shopOwner','user'), deleteCoupon);

router.route('/')
    .get(protect, getCoupons)
    .post(protect, authorize('admin','shopOwner', 'user'), addCoupon);

module.exports = router;