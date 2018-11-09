'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let onDemandDiagnosticSchema = new Schema({
    ODD: String,
    DDD: String,
    Type: String,
    Result: String,
    TimeStamp: String,
    GatewayId: String


});

module.exports = mongoose.model('onDemad', onDemandDiagnosticSchema);
