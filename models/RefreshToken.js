const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RefreshToken = mongoose.Schema({
    token:{
        type: String,
        required: true,
    },
    userID:{
        required: true,
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    
});

module.exports = mongoose.model('RefreshToken', RefreshToken);