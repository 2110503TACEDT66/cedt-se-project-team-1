const express = require('express');
const { getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updateUserPoint } = require('../controllers/user.js');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth.js');

router.route('/:id')
    .put(protect, authorize('admin', 'user'), updateUserPoint)
    .get(protect, authorize('admin', 'user', 'shopOwner'), getUser)
    .put(protect, authorize('admin'), updateUser)
    .delete(protect, authorize('admin'), deleteUser);


router.route('/')
    .get(protect, authorize('admin'), getUsers)
    .post(protect, authorize('admin'), createUser)


module.exports = router;