const express = require('express');
const { getCustomerCoupons, getCustomerCoupon, updateCustomerCoupon, deleteCustomerCoupon, addCustomerCoupon, getCustomerCouponByMassage, getCustomerCouponByUser } = require('../controllers/customerCoupon.js');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/:id')
.get(protect, getCustomerCouponByUser)
    .get(protect,getCustomerCoupon)
    .put(protect, authorize('admin', 'shopOwner', 'user'), updateCustomerCoupon)
    .delete(protect, authorize('admin', 'shopOwner','user'), deleteCustomerCoupon);

router.route('/massage/:massageId')
    .get(protect, authorize('admin', 'shopOwner', 'user'), getCustomerCouponByMassage)

router.route('/')
    .get(protect, authorize('admin', 'shopOwner','user'), getCustomerCoupons)
    .post(protect, authorize('admin','shopOwner', 'user'), addCustomerCoupon);

module.exports = router;