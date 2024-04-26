const express = require('express');
const { getMemberships, getMembership, addMembership, updateMembership, deleteMembership } = require('../controllers/membership.js');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');

router.route('/:id')
    .get(protect, getMembership)
    .put(protect, authorize('admin', 'user'), updateMembership)
    .delete(protect, authorize('admin', 'user'), deleteMembership);


router.route('/')
    .get(protect, getMemberships)
    .post(protect, authorize('admin', 'user'), addMembership);

module.exports = router;