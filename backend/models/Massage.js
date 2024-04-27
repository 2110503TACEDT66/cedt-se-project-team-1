const mongooes = require('mongoose');

const MassageSchema = new mongooes.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    district: {
        type: String,
        required: [true, 'Please add a district']
    },
    province: {
        type: String,
        required: [true, 'Please add a province']
    },
    postalcode: {
        type: String,
        required: [true, 'Please add a postalcode'],
        maxlength: [5, 'Postalcode can not be more than 5 characters']
    },
    tel: {
        type: String,
    },
    picture: {
        type: String,
        default: 'no-photo'
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    owner: {
        type: mongooes.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    overallRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    serviceRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    transportRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    priceRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    hygieneRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    price:{
        type: Number,
        required: true,
        min: 0,
        default: 300
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

MassageSchema.virtual('reservations', {
    ref: 'Reservation',
    localField: '_id',
    foreignField: 'massage',
    justOne: false
});

MassageSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    console.log(`Reservation being removed from massage ${this._id}`);
    await this.model('Reservation').deleteMany({ massage: this._id });
    next();
})

module.exports = mongooes.model('Massage', MassageSchema);