# socketprompter
Socketprompter is a simple but effective method for controlling an unlimited number of browser-based teleprompters from your phone or a PC. It's written in HTML5/Javascript and uses socket.io as a go-between

Basics of how to use socketprompter
* Download it
* Modify script.txt to your own teleprompter script
* Run:

       npm install


* Then run:

       node server.js
       
  
* Connect any teleprompter browser windows to http://yourserver
* Connect your phone's browser to http://yourserver/?control=true
* Tap to go fullscreen
* Pinch to zoom text size
* Scroll, and all connected terminals will scroll with you. The top of your phone is the top of your screen

Socketprompter is a project of the Karaoke Research Council and it's used on Presentation Nation as our teleprompter software of choice.