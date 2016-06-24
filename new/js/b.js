var x;
var user_details;
var crush_details = [];
var socket=io('http://localhost:8080');
var i;
//socket.emit('home',{});
$(function() {
  //var socket=io('http://localhost:8080');
  socket.emit('home',{});
  socket.on('fraud',function(){
    window.open("index.html","_self");
  });
  socket.on('usr_details',function(data){
    user_details=data;
    var crushes={crushes_no: user_details.crushes_no,
      crush1: user_details.crush1,
      crush2: user_details.crush2,
      crush3: user_details.crush3,
      crush4: user_details.crush4};
    socket.emit('c_details',crushes);

  //for(i=1;i<=user_details.crushes_no;i++){
    socket.on('crush1',function(data){
      document.getElementById('crushname1').innerHTML = data.name.toString();
      document.getElementById('crushroll1').innerHTML = "Roll No - "+data.roll_no.toString();
      document.getElementById('crushdept1').innerHTML = "Department - "+data.Department.toString();
      document.getElementById('crushpic1').src = data.imgsrc.toString();
    });
    socket.on('crush2',function(data){
      document.getElementById('crushname2').innerHTML = data.name.toString();
      document.getElementById('crushroll2').innerHTML = "Roll No - "+data.roll_no.toString();
      document.getElementById('crushdept2').innerHTML = "Department - "+data.Department.toString();
      document.getElementById('crushpic2').src = data.imgsrc.toString();
    });
    socket.on('crush3',function(data){
      document.getElementById('crushname3').innerHTML = data.name.toString();
      document.getElementById('crushroll3').innerHTML = "Roll No - "+data.roll_no.toString();
      document.getElementById('crushdept3').innerHTML = "Department - "+data.Department.toString();
      document.getElementById('crushpic3').src = data.imgsrc.toString();
    });
    socket.on('crush4',function(data){
      document.getElementById('crushname4').innerHTML = data.name.toString();
      document.getElementById('crushroll4').innerHTML = "Roll No - "+data.roll_no.toString();
      document.getElementById('crushdept4').innerHTML = "Department - "+data.Department.toString();
      document.getElementById('crushpic4').src = data.imgsrc.toString();
    });
  //}
  var mydata;
  if(user_details.gender=='M'){
    mydata=dataf;
  }
  else if(user_details.gender=='F'){
    mydata=datam;
  }
  /*for(i=1;i<=user_details.crushes_no;i++)
  {
    document.getElementById("crushname"+i.toString()).innerHTML = crush_details[i-1].name.toString();
    document.getElementById("crushroll"+i.toString()).innerHTML = "Roll No - "+crush_details[i-1].roll_no.toString();
    document.getElementById("crushdept"+i.toString()).innerHTML = "Department - "+crush_details[i-1].dept.toString();
    document.getElementById("crushpic"+i.toString()).src = crush_details[i-1].imgsrc.toString();
  }*/
  if(user_details.crushometer>10){
    user_details.crushometer=10;
  }
  for(i=1;i<=user_details.crushometer;i++){
    document.getElementById('heart'+i.toString()).src= "images/heartfill.jpg"
  }
  //var socket=io('http://localhost:8080');
    $( "#autocomplete-4" ).autocomplete({
        autoFocus: true,
        select: function( event, ui ) {
          $('#myModal').modal('show');
          document.getElementById("modalpic").src= ui.item.imgsrc.toString();
          document.getElementById("modalname").innerHTML = ui.item.label.toString();
          document.getElementById("modalroll").innerHTML = "Roll No - "+ui.item.roll_no.toString();
          document.getElementById("modaldept").innerHTML = "Department - "+ui.item.dept.toString();
          x = ui.item;
        },
        source: function(request, response) {
        var results = $.ui.autocomplete.filter(mydata, request.term);
        response(results.slice(0, 10));
    }
  });

  //alert(crush_details[0].name);
});
    /*socket.on('crush1',function(data){
      alert(data.name);
    });*/


})();
function plzconfirm(){
    document.getElementById("crushname"+(user_details.crushes_no+1).toString()).innerHTML = x.label.toString();
    document.getElementById("crushroll"+(user_details.crushes_no+1).toString()).innerHTML = "Roll No - "+x.roll_no.toString();
    document.getElementById("crushdept"+(user_details.crushes_no+1).toString()).innerHTML = "Department - "+x.dept.toString();
    document.getElementById("crushpic"+(user_details.crushes_no+1).toString()).src = x.imgsrc.toString();
    user_details.crushes_no++;
    socket.emit('add_crush',{crushes_no: user_details.crushes_no, username: x.username});
  }
