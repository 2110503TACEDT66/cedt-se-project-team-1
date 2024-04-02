const express = require('express');
const multer = require('multer');

const { getSlips, getSlip, createSlip, updateSlip, deleteSlip, uploadSlipPhoto } = require('../controllers/slips');
const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Set up multer to store uploads in the 'image/slip' folder
const upload = multer({ dest: 'image/upload/slips/' });

router.route('/').get(protect, getSlips).post(protect, authorize('admin', 'user'), createSlip);
router.route('/:id/photo').post(protect, authorize('admin', 'user'), upload.single('slipPhoto'), uploadSlipPhoto);
router.route('/:id').get(protect, getSlip).put(protect, authorize('admin', 'user'), updateSlip).delete(protect, authorize('admin', 'user'), deleteSlip);

module.exports = router;