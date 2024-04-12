const mongoose = require('mongoose');
const Massage = require('./Massage');

const ratingSchema = new mongoose.Schema({
    serviceRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    transportRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    priceRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    hygieneRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    comment: {
        type: String,
        required: true,
        default: "No comment"
    },
    overallRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    shopOwner:{
        type: mongoose.Schema.ObjectId,
        ref: 'ShopOwner',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    massageShop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Massage',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Update the rating of the massage shop after saving the rating
ratingSchema.post("save", async function () {
    const massageShop = this.massageShop.toString();
    const ratings = await this.constructor.find({ massageShop });

    let sumServiceRating = 0;
    let sumTransportRating = 0;
    let sumPriceRating = 0;
    let sumHygieneRating = 0;
    for (const rating of ratings) {
        sumServiceRating += rating.serviceRating;
        sumTransportRating += rating.transportRating;
        sumPriceRating += rating.priceRating;
        sumHygieneRating += rating.hygieneRating;
    }

    const serviceRating = sumServiceRating / ratings.length;
    const transportRating = sumTransportRating / ratings.length;
    const priceRating = sumPriceRating / ratings.length;
    const hygieneRating = sumHygieneRating / ratings.length;

    const overallRating = (serviceRating + transportRating + priceRating + hygieneRating) / 4;

    try {
        await Massage.findByIdAndUpdate(massageShop, {
            overallRating,
            serviceRating,
            transportRating,
            priceRating,
            hygieneRating,
        });
    }
    catch (err) {
        console.log(err);
        resizeBy.status(500).json({ success: false, message: "Internal server error" });
    }

});

module.exports = mongoose.model('Rating', ratingSchema);
