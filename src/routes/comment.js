var request = require('request');
var moment = require('moment');

module.exports = function(req,res) {
	var options = {}
	options.headers = {
    'x-diy-api-token': 'c274d44f7be0e3cfd7cfba7ddd91dbce55e7634c'
  }
  options.url = req.app.locals.apiServer+'/makers/'+req.params.owner+'/projects/'+req.params.id+'/comments';
  options.method = 'POST';
  options.json = true;
  options.body = { raw: req.body.comment };

  console.log(options);
  
  request(options,function(e,r,b) {
  	// {"head":{"code":400,"status":"Bad Request","collection":{"limit":1,"offset":0}},"response":{"error":"Missing required property: raw"}}
  	if(e) {
  		console.log(e);
  		res.end('');
  	} else {
  		console.log(b)
  		if(b.response.error) {
  			console.log(b);
  			res.end('')
  		} else {
		  	res.render('includes/comment', { comment: b.response, moment:moment } )
  		}
  	}
  })	
}