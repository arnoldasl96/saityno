const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PlaneSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    type:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    age:{
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 3,
    },
    space:{
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    ownerID:{
        required: true,
        type: Schema.Types.ObjectId,
        ref:'Carrier'
    },
    
});

module.exports = mongoose.model('Planes', PlaneSchema);