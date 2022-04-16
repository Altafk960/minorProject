const mongoose = require('mongoose');
const User = require('./user');



const uploadSchema = new mongoose.Schema({
    fileName: String,
    hash: String,
    userId: {
        type: String,
        ref: 'User'
    },
     fileType: {
        type: String
    },
    date: {
        type: String
    },
   
},{timestamps:true});

module.exports = mongoose.model("Upload", uploadSchema);