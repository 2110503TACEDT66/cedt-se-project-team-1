const express = require('express');
const { getRating, getRatings, updateRating, deleteRating, addRating } = require('../controllers/rating.js');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/:id')
    .get(protect,getRating)
    .put(protect, authorize('admin', 'user'), updateRating)
    .delete(protect, authorize('admin', 'user'), deleteRating);

router.route('/')
    .get(protect,getRatings)
    .post(protect, authorize('admin', 'user'), addRating);



module.exports = router;