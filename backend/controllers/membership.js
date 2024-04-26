const Membership = require('../models/Membership');
const User = require('../models/User');
const Massage = require('../models/Massage');
const mongoose = require('mongoose');

const getMemberships = async (req, res) => {
    let query;
    if (req.user.role === "user") {
        query = Membership.find({ user: req.user.id });
    }
    else if (req.user.role === "admin") {
        if (req.params.massageShopId) {
            query = Membership.find({ massageShop: req.params.massageShopId });
        }
        else {
            query = Membership.find();
        }
    }
    else if (req.user.role === "shopOwner") {
        if (!req.params.massageShopId) {
            return res.status(400).json({ success: false, error: 'Please provide massage shop id' });
        }
        query = Membership.find({ massageShop: req.params.massageShopId });
    }
    try {
        const memberships = await query;
        res.status(200).json({ success: true, count: memberships.length, data: memberships });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const getMembership = async (req, res) => {
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
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `No user with the id of ${req.body.user}`
            });
        }

        const massageShop = await Massage.findById(req.params.massageShopId);
        if (!massageShop) {
            return res.status(404).json({
                success: false,
                message: `No massage shop with the id of ${req.params.massageShopId}`
            });
        }

        const next30Days = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
        const expireAt = new Date(next30Days);

        const aggregateResult = await Membership.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id),
                    massageShop: new mongoose.Types.ObjectId(req.params.massageShopId)
                }
            }
        ]);
        if (aggregateResult.length > 0) {
            return res.status(400).json({
                success: false,
                message: `The user with ID ${req.user.id} has already been member of this massage shop`
            })
        }

        const membership = await Membership.create({
            user: req.user.id,
            massageShop: req.params.massageShopId,
            expireAt
        });
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
    getMembership,
    addMembership,
    updateMembership,
    deleteMembership
};
