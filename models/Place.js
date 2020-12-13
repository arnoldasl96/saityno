const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PlaceSchema = mongoose.Schema({
    localCode:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10,
    },
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
    city:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    country:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },

    
});

module.exports = mongoose.model('Place', PlaceSchema);