# socketprompter

by Ross Brackett

Socketprompter is a simple but effective method for controlling an unlimited number of browser-based teleprompters from your phone or a PC. It's written in HTML5/Javascript and uses socket.io as a go-between

Basics of how to use socketprompter
* Download it
* Modify script.txt to your own teleprompter script - use http://dan.hersam.com/tools/smart-quotes.html to remove any funny looking characters if you pasted from Word or Google Docs. Download-as Plain Text from Google Docs and there should be no problem.
* Run:

       npm install


* Then run:

       node server.js
       
  
* Connect any teleprompter browser windows to http://yourserver:8080
* Need to flip text? http://yourserver:8080?flip=horizontal
* Connect your phone's browser to http://yourserver:8080/?control=true
* Tap to go fullscreen
* Pinch to zoom text size (kinda works) or use the + and - buttons if you have a keyboard
* Scroll, and all connected terminals will scroll with you. The top of your phone is the top of your screen
* If you're in control mode, a grey line appears on the screen. Above the line is a 16x9 aspect ration landscape canvas, defining a good-guess safe area for the most common scenario I can imagine

There's a weird bug if you open a control and regular window in the same Chrome user instance (one in an incognito window is fine) performance tanks because the controlling Chrome won't emit as much. No idea why.