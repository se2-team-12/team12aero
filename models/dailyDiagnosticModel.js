'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let dailyDiagnosticSchema = new Schema({

    GatewayId : String,
    Time: String,
    Result: String,
    Type: String,
    dailyHour: String,
    dailyMin: String,
    dailySecond: String,
    DDD: String


});

module.exports = mongoose.model('dailyDiagnostic', dailyDiagnosticSchema);