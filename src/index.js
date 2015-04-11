var cluster = require('cluster');
var domain  = require('domain');
var express = require('express');
var request = require('request');

var port = 1337;

if (cluster.isMaster) {
  cluster.fork();

  cluster.on('disconnect', function(worker) {
    console.error('disconnect!');
    cluster.fork();
  });

} else {

  var app = express();

  app.set('view engine', 'ejs');
  app.use(express.static(__dirname.replace('/src','') + '/public'));
	app.set('views', __dirname + '/views');
  app.locals.apiServer = 'http://api.diy.org';

	var myroutes = require('./routes');
	app.use('/', myroutes);

  app.use(function domainMiddleware(req, res, next) {

    var reqDomain = domain.create();

    reqDomain.on('error', function (err) {
      console.error('error', err.stack);
      try {

        var killtimer = setTimeout(function() {
          process.exit(1);
        }, 30000);
        killtimer.unref();

        cluster.worker.disconnect();

        res.statusCode = 500;
        res.setHeader('content-type', 'text/plain');
        res.end('Oops, there was a problem!\n');
      } catch (er2) {
        console.error('Error sending 500!', er2.stack);
      }
    });

    reqDomain.run(next);
  });

  app.listen(port, function(){
    console.log('node listening on port '+port);
  });

  module.exports = app;
}