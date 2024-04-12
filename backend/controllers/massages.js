const Massage = require('../models/Massage');

exports.getMassages = async (req, res, next) => {
    let query;

    const reqQuery = { ...req.query };

    const removeFields = ['select', 'sort', 'page', 'limit'];

    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Massage.find(JSON.parse(queryStr)).populate('reservations')

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('name');
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Massage.countDocuments();

    query = query.skip(startIndex).limit(limit);

    try {
        const massages = await query;
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }
        res.status(200).json({ success: true, count: massages.length, pagination, data: massages });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

exports.getMassage = async (req, res, next) => {
    try {
        const massage = await Massage.findById(req.params.id);
        if (!massage) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: massage });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

exports.createMassage = async (req, res, next) => {
    try {
        req.body.user = req.user.id;

        const massage = await Massage.create(req.body);
        res.status(201).json({ success: true, data: massage });
    }
    catch (err) {
        res.status(400).json({ success: false })
    }
};

exports.updateMassage = async (req, res, next) => {
    try {
        const massage = await Massage.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!massage) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: massage });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

exports.deleteMassage = async (req, res, next) => {
    try {
        const massage = await Massage.findById(req.params.id);
        if (!massage) {
            return res.status(400).json({ success: false });
        }
        await massage.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};