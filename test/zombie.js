var assert = require("assert");
var express = require("express");
var port = 1337;
var app = express();

var http = require('http')
var request = require('request');
var server;
var domain = 'localhost'
var localServer = 'http://'+domain+':'+port;

const Browser = require('zombie');

describe('server', function () {
  before(function (done) {    
    app.set('view engine', 'ejs');
    app.use(express.static(__dirname.replace('/test','') + '/public'));
    app.set('views', __dirname.replace('test','src') + '/views/');
    app.locals.apiServer = 'http://api.diy.org';
    var myroutes = require('../src/routes');
    app.use('/', myroutes);

    server = http.createServer(app).listen(port, function(){
      console.log('  node listening on port '+port);
      done();
    });

  });

  describe('view a project', function(){    

    const browser = new Browser();
   
    browser.proxy = 'http://localhost:'+port;

    before(function(done) {
      browser.visit('/hivetest/577322', done);
    });

    describe('review page elements', function() {
   
      it('should be successful', function() {
        browser.assert.success();
      });
   
      it('should have a project title', function() {
        assert.ok(browser.query("section.projectInfo h1"));
      });
   
    });
   
    after(function() {
      browser.destroy();
    });

  });

  after(function () {
    server.close();
  });
});