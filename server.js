#!/usr/bin/env node

(function() {

var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app).listen(process.env.PORT||8080),
    io = require('socket.io').listen(server, {
        log: false
    });

var scrollPos=0;
var fontSize=7;

app.use(express.static(__dirname + '/')); //Where the static files are loaded from


//************** LISTENERS ********************
io.sockets.on('connection', function (socket) {
    // Welcome messages on connection to just the connecting client
    
    socket.emit('bfontsize', {
        fontsize: fontSize
    });

	  socket.emit('bScrollPos', {
      position: scrollPos
    });
    

    socket.on('scrollPos', function (data) { //user is sending a scroll value
            scrollPos= data.position;
            io.sockets.emit('bScrollPos', data); 
            //console.log(data);
    });

    socket.on('fontsize', function (data) { //user is sending a scroll value
            fontSize=data.fontsize;
            io.sockets.emit('bfontsize', data); 
    });
    
    socket.on('reload', function (data) { //user is sending a scroll value
            io.sockets.emit('breload', data); 
            console.log ("reloading script");
    });




});
 


}());

myInterfaces = require('os').networkInterfaces();

//console.log(myInterfaces);

console.log("Running on:\n");

Object.keys(myInterfaces).forEach(function(key) { //what IP is this server running on?
	
	for (var i=0; i<myInterfaces[key].length; i++){
		var theAddress = myInterfaces[key][i].address;
		if (theAddress.match(/\./)){//anti-IPv6 bias rears its head
  		if (theAddress.match(/^(?!127).*$/)){//first time I used negative lookahead in my life. No clue how it works.
  			console.log("http://" + theAddress +":8080");
  		}
  	}
  }
  
  
});
