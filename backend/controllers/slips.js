const Slip = require('../models/Slip');
const Reservation = require('../models/Reservation');
const fs = require('fs');

exports.getSlips = async (req, res, next) => {
    let query;
    if(req.user.role !== 'admin'){
        query = Slip.find({user: req.user.id}).populate({
            path: 'reservation',
            select: 'massage'
        })
    }else{
        if(req.params.reservationId){
            query = Slip.find({reservation: req.params.reservationId}).populate({
                path: 'reservation',
                select: 'massage'
            })
        }else{
           query = Slip.find().populate({
            path: 'reservation',
            select: 'massage'
        }) 
        }
    }
    try {
        const slips = await query;
        res.status(200).json({success: true, count: slips.length, data: slips});
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false,message:"Cannot find Slip"});
    }
}

exports.getSlip = async (req, res, next) => {
    try{
        const slip = await Slip.findById(req.params.id).populate({
            path: 'reservation',
            select: 'massage'
        });

        if(!slip){
            return res.status(404).json({success: false, message: `No slip with the id of ${req.params.id}`});
        }
        res.status(200).json({success: true, data: slip});
    } catch (err) {
        res.status(500).json({success: false, message: "Cannot find slip"});
    }
}

exports.createSlip = async (req, res, next) => {
    try {
        // req.body.reservation=req.params.reservation;
        const reservation = await Reservation.findById(req.body.reservation);

        if(!reservation){
            return res.status(404).json({success: false, message: `No reservation with the id of ${req.params.reservationId}`});
        }
        console.log(req.body);

        req.body.user = req.user.id;

        const slip = await Slip.create(req.body);

        res.status(201).json({
            success: true,
            data: slip
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: "Cannot create slip"});
    }
}

exports.updateSlip = async (req, res, next) => {
    try {
        let slip = await Slip.findById(req.params.id);

        if(!slip){
            return res.status(404).json({success: false, message: `No slip with the id of ${req.params.id}`});
        }

        slip = await Slip.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({success: true, data: slip});
    } catch (err) {
        res.status(500).json({success: false, message: "Cannot update slip"});
    }
}

exports.deleteSlip = async (req, res, next) => {
    try {
        const slip = await Slip.findById(req.params.id);

        if(!slip){
            return res.status(404).json({success: false, message: `No slip with the id of ${req.params.id}`});
        }

        slip.remove();

        res.status(200).json({success: true, data: {}});
    } catch (err) {
        res.status(500).json({success: false, message: "Cannot delete slip"});
    }
}

exports.uploadSlipPhoto = async (req, res, next) => {
    const slip = await Slip.findById(req.params.id);

    if(!slip){
        return res.status(404).json({success: false, message: `No slip with the id of ${req.params.id}`});
    }

    if(!req.file){
        return res.status(400).json({success: false, message: "Please upload a file"});
    }

    const file = req.file;
    console.log(file);

    // Make sure the image is a photo
    if(!file.mimetype.startsWith('image')){
        return res.status(400).json({success: false, message: "Please upload an image file"});
    }

    // Check file size
    if(file.size > process.env.MAX_FILE_UPLOAD){
        return res.status(400).json({success: false, message: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`});
    }

    // Create custom filename
    file.name = `slip_${slip._id}`;
    console.log(file.path)
    fs.rename(file.path, `${process.env.FILE_UPLOAD_PATH}/slips/${file.name}.${file.originalname.split('.').pop()}`, async (err) => {
        if(err){
            console.error(err);
            return res.status(500).json({success: false, message: "Problem with file upload"});
        }

        await Slip.findByIdAndUpdate(req.params.id, {slipPhoto: file.name});

        res.status(200).json({success: true, data: file.name});
    });
}
