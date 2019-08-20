# Hellaprompter
The Hella Good Prompter

Hellaprompter is a free teleprompter that works over wi-fi. You can use a phones or tablets as teleprompter terminals, a control surface, or both at once! It supports mirrored text. It runs right in the browser on any modern phone or laptop, no app required. All you need is a computer to run the web server and a wifi network where devices can talk to each other. I use it at work with an crappy old Android Fire HD tablet running the Silk browser and a $200 Glide Gear teleprompter. Also works great on computers with two or more displays.

## Quick start
Download the app and run it. 

Or, if you downloaded the source code, run `npm install` then `node server.js`

A browser window will immediately launch, opened to the launcher.

### Edit the script
Select "Editor" from the dropdown, then "Go."  In the editor, paste in your script and format it. Click "Save and update clients" and you're ready to start a teleprompter session. You can return here any time and update your script even in the middle of a session, or just keep a browser window open with the editor loaded if you want to make changes as you go.

### Connect terminals
If your prompter is a second monitor attached to your primary PC, open a new browser window. If you're using a phone or a tablet as the prompter, IM yourself the URL or scan the QR code. 

You can either control the prompter ("Controller") or open a prompter window ("Prompter".) If you're you're using a teleprompter with a beam splitter, you'll likely be choosing "Prompter (flip horizontal)." Don't forget to disable screensavers (at least until I figure out how to implement nosleep.js.)


## Prompter instructions
In Prompter mode:

* Click or tap the screen to go full-screen

In Controller mode:

* Scroll the window, and all connected Prompters will scroll with you. The top of your phone is the top of your screen.
* Use the + and - buttons if you have a keyboard. Pinch to do the same on mobile (kinda works.)
* A grey line appears on the screen. Above the line is a 16x9 aspect ratio landscape canvas, defining a good-guess safe area.

## Known bugs
On some older versions of Chrome (and maybe other browsers) there's a weird bug if you open both a controller and a prompter window in the same Chrome user instance, you get jerky motion, as the controlling Chrome won't emit as much for some reason. You can get around this if you open either your controller window or your prompter window(s) in an incognito window.