'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let dailyDiagnosticResultSchema = new Schema({
    DDD: String,
    Type: String,
    Result: String,
    IsClear: Boolean,
    GatewayId: String


});

module.exports = mongoose.model('dailyResult', dailyDiagnosticResultSchema);