const User = require('../models/User');

const getUserPoints = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({ success: true,data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const getUserPoint = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, data: user});
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const updateUserPoint = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const userPoint = user.point;
        const newPoint = userPoint + req.body.point;
        const updatedUserPoint = await User.findByIdAndUpdate(req.params.id, { point: newPoint }, { new: true });
        res.status(201).json({ success: true, data: updatedUserPoint });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add userpoint' });
    }
};

module.exports = {
    getUserPoints,
    getUserPoint,
    updateUserPoint
};
