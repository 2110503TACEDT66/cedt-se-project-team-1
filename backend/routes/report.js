const express = require('express');
const { getReports, getReport, updateReport, deleteReport, addReport } 
= require('../controllers/report.js');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');
    
router.route('/:id')
    .get(protect, authorize('admin'), getReport)
    .put(protect, authorize('admin'), updateReport)
    .delete(protect, authorize('admin'), deleteReport);

router.route('/')
    // .get(getReports)
    // .post(addReport);
    .get(protect, authorize('admin'), getReports)
    .post(protect, authorize('admin', 'shopOwner'), addReport);
    
module.exports = router;