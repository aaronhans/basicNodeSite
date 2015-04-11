var DIY = {};

DIY.utils = {

	ajaxPost: function (url, params, callback) {
		var xmlhttp = new XMLHttpRequest();
		console.log('hi')
		console.log(params)
		xmlhttp.open("POST", url, true);

		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				callback(xmlhttp.responseText);
			}
		}
		xmlhttp.send(params);
	},

	ajax: function (url, callback) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=function() {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200) {
		    callback(xmlhttp.responseText);
		  }
		}
		xmlhttp.open("GET",url,true);
		xmlhttp.send();
	}	

}