const express = require('express');
const router = express.Router({});
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/swe2', {useNewUrlParser: true,useCreateIndex: true});

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
var bcryptNodejs = require("bcrypt-nodejs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");


let Heartbeat = require('../models/heartbeatModel');
let Diagnostic = require('../models/diagnosticModel'); 
let User = require('../models/userModel');
let Gateway = require('../models/gatewayModel');
let dailyDiagnostic = require('../models/dailyDiagnosticModel');
let dailyDiagnosticResult = require('../models/dailyDiagnosticResultModel'); 
let OndemandDiagnostic = require('../models/onDemandResultsModel');   

const validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

router.post('/register', function(req, res) {
  var new_user = new User({
    userName: req.body.userName,
    password: generateHash(req.body.password),
    email: req.body.email
  });

  new_user.save()
          .then(result => {
            console.log(result);
            res.status(201).json({
                User: result,
                message: "POST Success" 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/login', function(req, res) {
  const email = req.body.email;
  const password = req.body.password
  User.findOne({email: req.body.email}, function(err, user) {


    if (!bcrypt.compareSync(password, user.password)) {
            res.json({
             status: 0,
             message: err
         });

    } else {
            res.json({
                status: 1,
                message: "Successful login"
            });
    }
  });
});

/* GET heartbeats */
router.get('/heartbeats', function (req, res) {
    Heartbeat.find()
        .exec()
        .then(docs =>{
            //console.log(docs);
            test = docs;
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

/* GET gateways associated with email */
router.get("/gateways/:email", (req, res, next) => {
  const id = req.params.email;
  var query = {email: id}
    Gateway.find(query)
        .exec()
        .then(docs =>{
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Get heartbeats associated with gateway
router.get("/:GatewayId", (req, res, next) => {
  const id = req.params.GatewayId;
  var query = {GatewayId: id}
    Heartbeat.find(query)
        .exec()
        .then(docs =>{
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.put('/', function (req, res) {
    res.status(202).json({
        "Status": "put ok"
    });
    //res.status(202).send();
});
//Get on demand diagnostic test
router.get("/onDemand/:GatewayId", (req, res, next) => {
    const id = req.params.GatewayId;
    let query = {GatewayId: id}

    OndemandDiagnostic.find(query)
        .exec()
        .then(docs =>{
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.get("/dailyDiagnostic/:GatewayId", (req, res, next) => {
    const id = req.params.GatewayId;
    let query = {GatewayId: id}

    dailyDiagnosticResult.find(query)
        .exec()
        .then(docs =>{
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});


router.put('/', function (req, res) {
    res.status(202).json({
        "Status": "put ok"
    });
    //res.status(202).send();
});


//Post a on demand diagnostics test
router.post('/', function (req, res) {

    let ODDTest = new Diagnostic({
        ODD: req.body.ODD,
        GatewayId: req.body.GatewayId,
  
    });

    ODDTest
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                Diagnostic: result,
                message: "POST Success" 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
// Post a daily diagnostics test
router.post('/dailyDiagnostic', function (req, res) {

    let dailyDiagnosticTest = new dailyDiagnostic({
        dailyHour: req.body.dailyHour,
        dailyMin: req.body.dailyMin,
        dailySecond: req.body.dailySecond,
        GatewayId: req.body.GatewayId,
        Type: req.body.Type,
        DDD: req.body.DDD
  
    });

    dailyDiagnosticTest
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                Diagnostic: result,
                message: "Success" 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
// Create a new gateway and receive a gatewayId
router.post('/createGateway', function (req, res) {
    let newGateway = new Gateway({
        GatewayId: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        email: req.body.email,
        token: req.body.email
  
    });

    newGateway
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                Gateway: result,
                message: "New Gateway created" 
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.post('/user', function (req, res, bcrypt) {

  const password = req.body.password
 

    const salt = bcryptNodejs.genSaltSync(10);
    const hash = bcryptNodejs.hashSync(password, salt);


    let newUser = new User({
        email: req.body.email,
        userName: req.body.userName,
        password: hash,
  
    });

    newUser    
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                User: result,
                message: "POST Success" 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



router.delete("/:GatewayId", (req, res, next) => {
  const id = req.params.GatewayId;
  Gateway.remove({ GatewayId: id })
    .exec()
    .then(result => {
        console.log("Gateway deleted");
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});



router.options('/', function (req, res) {
    res.header('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD').status(204).send();
});

module.exports = router;
