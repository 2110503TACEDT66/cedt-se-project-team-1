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
    postalcode:{
        type: String,
        required: [true, 'Please add a postalcode'],
        maxlength: [5, 'Postalcode can not be more than 5 characters']
    },
    tel:{
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
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

MassageSchema.virtual('reservations', {
    ref: 'Reservation',
    localField: '_id',
    foreignField: 'massage',
    justOne: false
});

MassageSchema.pre('deleteOne',{document: true, query: false}, async function(next){
    console.log(`Reservation being removed from massage ${this._id}`);
    await this.model('Reservation').deleteMany({message: this._id});
    next();
})

module.exports = mongooes.model('Massage', MassageSchema);