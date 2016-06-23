express=require('express');
app=express();
var request=require('request');
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname+'/new'));
http.listen(8080);
io.on('connection', function(socket)
{
	var usr;
	socket.on('authentication',function(data)
	{
		//function(data.username,data.password)
		//{
			var user=encodeURIComponent(data.username);
			var pass=encodeURIComponent(data.password);
			var Proxyurl='http://'+user+':'+pass+'@'+'vsnlproxy.iitk.ac.in'+':'+'3128';
			var proxyrequest=request.defaults({'proxy':Proxyurl});
			proxyrequest.get('http://www.google.com',function(err,res)
			{
				if(res.statusCode===407)
				{
					io.emit('invalid',{x:'just in case'});
				}
				else if(res.statusCode===200)
				{
					usr = data.username;
					io.emit('valid',{x:'again same'});
				}
				else console.log(res.statusCode);	
	
			});
		//};
		

	});
	//setTimeout(function(){console.log(usr);},2000);
});
