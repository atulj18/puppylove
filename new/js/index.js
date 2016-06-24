(function(){
	var usrname;
	var app=angular.module('Module',[]);
	app.controller('login',function(){
		this.username;
		this.password;
		this.submit=function(){
			this.socket=io('http://localhost:8080');
			this.socket.emit('authentication',{username: this.username, password: this.password});
			this.socket.on('invalid',function f(){
				document.getElementById('invlid').style.display="block";
				this.username="";
				this.password="";
			});
			this.socket.on('valid',function f(){
				usrname=this.username;
				window.open("home.html","_self");
			});
		};
	});



})();
