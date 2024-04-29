const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({ success: true,data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const getUser = async (req, res) => {
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

const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create user' });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update user' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, data: deletedUser });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete user' });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updateUserPoint
};
