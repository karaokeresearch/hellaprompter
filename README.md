# socketprompter

by Ross Brackett

Socketprompter is a browser-based teleprompter built on nodejs/socket.io. Control your teleprompter from your phone, your laptop, whatever, and distribute to an unlimited number of prompter displays. No app required, all you need is node and a browser. Supports mirrored text!

Basics of how to use socketprompter
* Download it
* Modify script.txt to your own teleprompter script - use http://dan.hersam.com/tools/smart-quotes.html to remove any funny looking characters if you pasted from Word or Google Docs. Download-as Plain Text from Google Docs and there should be no problem.
* Run:

       npm install


* Then run:

       node server.js
       
  
* Connect any teleprompter browser windows to http://yourserver:8080
* Need to flip text for a mirrored prompter? http://yourserver:8080?flip=horizontal
* You can also flip vertical or both
* To control the prompter, connect your phone or PC's browser to http://yourserver:8080?control=true
* Tap to go fullscreen

In control mode:
* A grey line appears on the screen. Above the line is a 16x9 aspect ratio landscape canvas, defining a good-guess safe area
* Scroll the window, and all connected terminals will scroll with you. The top of your phone is the top of your screen
* Pinch to zoom text size (kinda works) or use the + and - buttons if you have a keyboard
* If you update script.txt, type "r" and all terminals will refresh with the update text without having to manually refresh

There's a weird bug if you open a control and regular window in the same Chrome user instance (one in an incognito window is fine) performance tanks because the controlling Chrome won't emit as much. No idea why.