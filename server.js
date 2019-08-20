#!/usr/bin/env node

var QRCode = require("qrcode-svg");

var serverPort="9876";


var clear = require('clear');
clear();

var fs = require('fs');


var mkdirp = require('mkdirp');
    




var ips =[];


starterScript=`Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.

Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.

But, in a larger sense, we can not dedicate, we can not consecrate, we can not hallow, this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us, that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion, that we here highly resolve that these dead shall not have died in vain, that this nation, under God, shall have a new birth of freedom, and that government of the people, by the people, for the people, shall not perish from the earth.
`;


const envPaths = require('env-paths');

const paths = envPaths('hellaprompter', {suffix:''});
var scriptFile=paths.data + "/script.txt";


if (!fs.existsSync(paths.data)){
    mkdirp.sync(paths.data); //make the script directory and make all parent directories. 
}

if (!fs.existsSync(scriptFile)){	
	fs.writeFile(scriptFile, starterScript, function(err) {
		if(err) {
			return console.log(err);
		}
	});
}






var httpLoaded = function(){
	myInterfaces = require('os').networkInterfaces();
	
	console.log("\nHellaprompter\n\n");
	console.log("Loading script from: " + scriptFile);
	console.log("\n\nRunning on:\n");
 	var choseAnInterface=false;
	var interfaceChosen=0;
	
	Object.keys(myInterfaces).forEach(function(key) { //what IP is this server running on?
	
		for (var i=0; i<myInterfaces[key].length; i++){
			var theAddress = myInterfaces[key][i].address;
			if (theAddress.match(/\./)){//anti-IPv6 bias rears its head
	  		//if (theAddress.match(/^(?!127).*$/)){//ignore localhost. First time I used negative lookahead in my life. No clue how it works.
	  			var tempip= theAddress;
	  			if (choseAnInterface ==false && theAddress.match(/^(?!127).*$/)) { //the first interface or at least the non localhost
	  					ips.push([tempip, true]);
	  					choseAnInterface=true;
	  					interfaceChosen=i;
	  				}else{
	  					ips.push([tempip, false]);
	  				}	  			
	  			console.log("http://" + tempip + ":" + serverPort);	
	  		//}
	  	}
	  }
	  
	});

open("http://" + ips[interfaceChosen][0]+ ":"+ serverPort);
console.log("\n\n");
};





const open = require('open');
var express = require('express'),
    http = require('http'),
    app = express();

var server = http.createServer(app).listen(serverPort, httpLoaded).on('error', function(){
		console.log("Error: port "+ serverPort + "  already in use\n\n\n\n");
	});
	
	


var  io = require('socket.io').listen(server, {
        log: false
    });

var scrollPos=0;
var fontSize=5;

app.use('/', express.static(__dirname + '/static/')); //Where the static files are loaded from
app.use('/script/', express.static(paths.data)); //Where the static files are loaded from

app.get("/qrcode.svg", function(req, res){
	var svgURL=req.query.url;	
	var svg = new QRCode({content: svgURL, padding: 0}).svg();
  res.header("Content-Type", "image/svg+xml");
  res.end(svg);
});


//************** LISTENERS ********************
io.sockets.on('connection', function (socket) {
    // Welcome messages on connection to just the connecting client

	socket.emit('ips', {
        ips
    });
    
    socket.emit('serverPort', {
        serverPort: serverPort
    });
    

		socket.emit('bfontsize', {
        fontsize: fontSize
    });
    

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

    socket.on('fontsize', function (data) { //user is sending a font size change
            fontSize=data.fontsize;
            io.sockets.emit('bfontsize', data); 
    });
    
    	
    socket.on('newscript', function (data) { //user is sending a new script
            //io.sockets.emit('breload', data); 
            //console.log (data.text);
        
    				
    				fs.writeFile(scriptFile, data.text, function(err) {
   						if(err) {
        				return console.log(err);
    					}
    				//console.log('Script saved!');
    				io.sockets.emit('breload', data); 
            //console.log ("reloading script");
						});
    			
    });


});
 


