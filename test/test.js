//the test the env variable is set to test
//Test
process.env.NODE_ENV = 'test';

var supertest = require("supertest");
let mongoose = require("mongoose");
var Heartbeat = require('../models/heartbeatModel');


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let app = require('../app');

const crouter = require('../routes/clientSide');
const grouter = require('../routes/gateway');


const assert = require('assert');

function asyncFunction() {
    return new Promise(resolve => {
        setTimeout(resolve, 10);
    });
}


chai.use(chaiHttp);


  describe('/GET Heartbeat', () => {
      it('it should GET all the heartbeats', async() =>   {
        chai.request(crouter)
            .get('/heartbeats')

            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              //await asyncFunction();
              assert.ok(true);
             done(); 
            });
      });
  });
    describe('/GET on Demand Diagnostics', () => {
      it('it should GET all the on demand diagnostics', async() =>  {
        chai.request(crouter)
   
            .get('/onDemand/1')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
             done();
            });
      });
  });
      describe('/GET on Daily Diagnostics', () => {
      it('it should GET all the on demand diagnostics', async() =>  {
        chai.request(crouter)
            .get('/dailyDiagnostic/1')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
             done();
            });
      });
  });
