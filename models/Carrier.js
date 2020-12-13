const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CarrierSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    age: {
        type: Number,
        required: true,
        minlength:1,
        maxlength:3,
    },
    Planes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Planes'
        }
    ]
    
});

module.exports = mongoose.model('Carrier', CarrierSchema);