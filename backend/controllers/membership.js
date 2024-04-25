const Membership = require('../models/Membership');
const User = require('../models/User');
const Massage = require('../models/Massage');

const getMemberships = async (req, res) => {
    try {
        const memberships = await Membership.find();
        res.status(200).json({ success: true, data: memberships });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const getMembershipById = async (req, res) => {
    const { id } = req.params;
    try {
        const membership = await Membership.findById(id);
        if (!membership) {
            return res.status(404).json({ success: false, error: 'Membership not found' });
        }
        res.status(200).json({ success: true, data: membership });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const addMembership = async (req, res) => {
    try {
        const user = await User.findById(req.body.user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `No user with the id of ${req.body.user}`
            });
        }

        const massageShop = await Massage.findById(req.body.massageShop);
        if (!massageShop) {
            return res.status(404).json({
                success: false,
                message: `No massage shop with the id of ${req.body.massageShop}`
            });
        }

        const membership = await Membership.create(req.body);
        res.status(201).json({ success: true, data: membership });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const updateMembership = async (req, res) => {
    const { id } = req.params;
    try {
        const membership = await Membership.findByIdAndUpdate(id, req.body, { new: true });
        if (!membership) {
            return res.status(404).json({ success: false, error: 'Membership not found' });
        }
        res.status(200).json({ success: true, data: membership });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const deleteMembership = async (req, res) => {
    const { id } = req.params;
    try {
        const membership = await Membership.findByIdAndDelete(id);
        if (!membership) {
            return res.status(404).json({ success: false, error: 'Membership not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

module.exports = {
    getMemberships,
    getMembershipById,
    addMembership,
    updateMembership,
    deleteMembership
};
