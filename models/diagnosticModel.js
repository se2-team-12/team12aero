'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let DiagnosticSchema = new Schema({
    ODD: String,
    DDD: String,
    Type: String,
    Result: String,
    IsClear: Boolean,
    GatewayId: String


});

module.exports = mongoose.model('ODD', DiagnosticSchema);