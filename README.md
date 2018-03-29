# WindowsJs
WindowsJs is a nodejs application that enables the phone (limited) control over Windows machines,
by creating a webserver, which the phone can then interact with.

Pre-requisits on the Windows machine:

	1. Install nodejs (https://nodejs.org/en/download/)
	2. Install edgejs (https://github.com/tjanczuk/edge)
		npm install edge

How to start:

	1. On the Windows machine run from a command prompt
		node TooLazyToStandUpController.js
	2. Find out ip of windows mahcine (ipconfig in command prompt)
		Or muck with your network so that you can find out comp by name
	3. Using any phone browser go to [ip]:8080/TooLazyToStandUp/Trackpad/Trackpad.html	

How I use it:

	I use this appliation to control my computer, when stream shows/Movies from my computer onto my TV.
	Instead of standing up and going to my computer to pause, click the next episode, etc., I use my phone to do it.
