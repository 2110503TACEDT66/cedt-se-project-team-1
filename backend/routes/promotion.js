const express = require('express');
const { getPromotions, getPromotion, updatePromotion, deletePromotion, addPromotion } = require('../controllers/promotion.js');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });


router.route('/:id')
    .get(protect, getPromotion)
    .put(protect, authorize('admin', 'shopOwner'), updatePromotion)
    .delete(protect, authorize('admin', 'shopOwner'), deletePromotion);

router.route('/')
    .get(protect, getPromotions)
    .post(protect, authorize('admin','shopOwner'), addPromotion);

module.exports = router;