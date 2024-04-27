const express = require('express');
const { getUserPoints, getUserPoint, updateUserPoint } = require('../controllers/point.js');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');

router.route('/:id')
    .put(protect, authorize('admin', 'user'), updateUserPoint)
    .get(protect, authorize('admin', 'user'), getUserPoint);


router.route('/')
    .get(protect, authorize('admin'), getUserPoints);


module.exports = router;