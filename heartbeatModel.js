'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let HeartbeatSchema = new Schema({
    GatewayId : String,
    TimeStamp: String,

 
});

module.exports = mongoose.model('Heartbeat', HeartbeatSchema);