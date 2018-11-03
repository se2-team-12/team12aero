'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userSchema = new Schema({

	email: {
         type: String,
         required: true,
         unique: true
     },
    userName: {
         type: String,
         required: true,
         unique: true
     },

     password: {
         type: String,
         required: true,
     },
     tokenId: {
         type: String,
     },
     hash: {
         type: String,
     },

 
});

module.exports = mongoose.model('User', userSchema);