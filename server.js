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




});
 


}());


console.log("Loaded on port 8080");