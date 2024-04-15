const Rating = require('../models/Rating');
const Massage = require('../models/Massage.js');
const Report = require('../models/Report.js');

// Get all reports
const getReports = async (req, res) => {
    try {
        if (!req.params.massageShopId) {
            const reports = await Report.find();
            res.status(200).json({ success: true, data: reports });
        }
        else {
            const massageShop = await Massage.findById(req.params.massageShopId);
            if (!massageShop) {
                return res.status(404).json({
                    success: false,
                    message: `No massageShop with the id of ${req.params.massageShopId}`
                });
            }

            const reports = await Report.find({ massageShop: req.params.massageShopId });
            res.status(200).json({ success: true, data: reports });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Get report by ID
const getReport = async (req, res) => {
    const { id } = req.params;
    try {
        const report = await Report.findById(id);
        if (!report) {
            return res.status(404).json({ succes: false, error: 'Report not found' });
        }
        res.status(200).json({ success: false, data: report });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

//update report (only reason)
const updateReport = async (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;
    try {
        const updatedReport = await Rating.findByIdAndUpdate(id, { reason }, { new: true });
        if (!updatedReport) {
            return res.status(404).json({ success: false, error: 'Report not found' });
        }
        res.status(200).json({ success: true, data: updatedReport });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Delete report
const deleteReport = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedReport = await Report.findByIdAndDelete(id);
        if (!deletedReport) {
            return res.status(404).json({ success: false, error: 'Report not found' });
        }
        res.status(200).json({ success: true, message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Add report
const addReport = async (req, res) => {
    try {
        // Create a new report
        const { ratingId, reason } = req.body;

        // Check if the rating exists
        const rating = await Rating.findById(
            ratingId
        );
        if (!rating) {
            return res.status(404).json({
                success: false,
                message: `No rating with the id of ${ratingId}`
            });
        }

        const report = await Report.create({
            ratingId,
            reason
        });
        res.status(200).json({
            success: true,
            data: report
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Cannot create Report'
        })
    }
};

module.exports = {
    getReports,
    getReport,
    updateReport,
    deleteReport,
    addReport
};