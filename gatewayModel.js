'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

    
let gatewaySchema = new Schema({
    GatewayId: mongoose.Schema.Types.ObjectId,
    token: String,
    email: {
        type:String,
        unique: true
    },
    userName: String

 
});

module.exports = mongoose.model('Gateway', gatewaySchema);