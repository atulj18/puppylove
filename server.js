var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('students.db')
express=require('express');
app=express();
var request=require('request');
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname+'/new'));
http.listen(8080);
var usr;
io.on('connection', function(socket)
{
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
	socket.on('home',function(data){
		if(typeof usr === "undefined"){io.emit('fraud');};
		if(typeof usr === "string") {
			db.each("SELECT rowid AS id,name,roll_no,imgsrc,username,crush1,crush2,crush3,crush4,crushes_no,Department,gender,crushmeter FROM students",function(err,row){
				if(usr === row.username){
					io.emit('usr_details',{
						gender : row.gender,
						crushes_no : Number(row.crushes_no),
						crushometer : Number(row.crushmeter),
						crush1 : row.crush1,
						crush2 : row.crush2,
						crush3 : row.crush3,
						crush4 : row.crush4
					});
				};
			});
		};
	});
	socket.on('c_details',function(data){
		db.each("SELECT rowid AS id,name,roll_no,imgsrc,username,crush1,crush2,crush3,crush4,crushes_no,Department,gender FROM students",function(err,row){
			if(data.crushes_no >= 1 && row.username == data.crush1){
				io.emit('crush1',{
					name : row.name,
					imgsrc : row.imgsrc,
					Department : row.Department,
					roll_no : row.roll_no
				});
			};
			if(data.crushes_no >= 2 && data.crush2 === row.username){
				io.emit('crush2',{
					name : row.name,
					imgsrc : row.imgsrc,
					Department : row.Department,
					roll_no : row.roll_no
				})
			};
			if(data.crushes_no >= 3 && data.crush3 === row.username){
				io.emit('crush3',{
					name : row.name,
					imgsrc : row.imgsrc,
					Department : row.Department,
					roll_no : row.roll_no
				})
			};
			if(data.crushes_no == 4 && data.crush4 === row.username){
				io.emit('crush4',{
					name : row.name,
					imgsrc : row.imgsrc,
					Department : row.Department,
					roll_no : row.roll_no
				})
			};
		});
	});
	socket.on('add_crush',function(data){
		db.run("UPDATE students SET crushes_no = ? WHERE username = ?",[data.crushes_no.toString(),usr])
		if(data.crushes_no === 1){db.run("UPDATE students SET crush1 = ? WHERE username = ?",[data.username,usr])
			db.each("SELECT rowid as id,crushmeter,username FROM students",function(err,row){
				if(row.username === data.username){
					var x = Number(row.crushmeter);
					x = x+1
					db.run("UPDATE students SET crushmeter = ? WHERE username = ?",[x.toString(),data.username])
				}
			});
		}
		else if(data.crushes_no === 2){db.run("UPDATE students SET crush2 = ? WHERE username = ?",[data.username,usr])
		db.each("SELECT rowid as id,crushmeter,username FROM students",function(err,row){
			if(row.username === data.username){
				var x = Number(row.crushmeter);
				x = x+1
				db.run("UPDATE students SET crushmeter = ? WHERE username = ?",[x.toString(),data.username])
			}
		});
		}
		else if(data.crushes_no === 3){db.run("UPDATE students SET crush3 = ? WHERE username = ?",[data.username,usr])
		db.each("SELECT rowid as id,crushmeter,username FROM students",function(err,row){
			if(row.username === data.username){
				var x = Number(row.crushmeter);
				x = x+1
				db.run("UPDATE students SET crushmeter = ? WHERE username = ?",[x.toString(),data.username])
			}
		});
		}
		else if(data.crushes_no === 4){db.run("UPDATE students SET crush2 = ? WHERE username = ?",[data.username,usr])
		db.each("SELECT rowid as id,crushmeter,username FROM students",function(err,row){
			if(row.username === data.username){
				var x = Number(row.crushmeter);
				x = x+1
				db.run("UPDATE students SET crushmeter = ? WHERE username = ?",[x.toString(),data.username])
			}
		});
		}
	});
	//setTimeout(function(){console.log(usr);},2000);
});
