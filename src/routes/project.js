var request = require('request');
var async = require('async');
var moment = require('moment');

module.exports = function(req,res) {

  async.parallel({
    project: function(callback) {
			var url = req.app.locals.apiServer+'/makers/'+req.params.owner+'/projects/'+req.params.id;
			console.log(url)
			request(url,function(e,r,b) {
			  if(e) {
          callback(e, null);
			  } else {
          callback(null, b);
			  }
			});
    },
    comments: function(callback) {
			var url = req.app.locals.apiServer+'/makers/'+req.params.owner+'/projects/'+req.params.id+'/comments';
			request(url,function(e,r,b) {
			  if(e) {
          callback(e, null);
			  } else {
          callback(null, b);
			  }
			});
    },
    favorites: function(callback) {
			var url = req.app.locals.apiServer+'/makers/'+req.params.owner+'/projects/'+req.params.id+'/favorites';
			request(url,function(e,r,b) {
			  if(e) {
          callback(e, null);
			  } else {
          callback(null, b);
			  }
			});
    },
    achievements: function(callback) {
			var url = req.app.locals.apiServer+'/makers/'+req.params.owner+'/achievements';
			request(url,function(e,r,b) {
				console.log(e)
				console.log(b)
			  if(e) {
          callback(e, null);
			  } else {
          callback(null, b);
			  }
			});
    }
  },
  function(err, results) {
  	if(err) {
	    console.log(err);
  		res.render('error',{});
  	} else {
	  	res.render('project',{
				params:req.params,
				title:JSON.parse(results['project']).response.title,
				data:{
					project:JSON.parse(results['project']),
					comments:JSON.parse(results['comments']),
					favorites:JSON.parse(results['favorites']),
					achievements:JSON.parse(results['achievements'])
				},
				moment:moment
			})
  	}
  });
}
