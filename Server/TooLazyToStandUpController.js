var edgeController = require('./Windows');

var express = require('express');
var server = express();
var port = process.env.PORT || 8080;

// routes
server.use('/TooLazyToStandUp/Trackpad', express.static(__dirname + '/View/Scripts'));
server.use('/TooLazyToStandUp/Trackpad', express.static(__dirname + '/View/HTML'));
server.use('/TooLazyToStandUp/Trackpad', express.static(__dirname + '/View/CSS'));
server.use('/TooLazyToStandUp/Trackpad', express.static(__dirname + '/View/Images'));

server.get('/TooLazyToStandUp/MoveCursor', function (req, res) {

    // send resposne back to browser first so it doesnt have to wait?
    res.send('');
    edgeController.moveCursor(parseInt(req.query.x), parseInt(req.query.y));
});

server.get('/TooLazyToStandUp/MouseEvent', function (req, res) {

    res.send('');
    edgeController.mouseEvent(req.query.value);
});

server.get('/TooLazyToStandUp/KeyBoardEvent', function (req, res) {

    res.send('');
    edgeController.keyboardEvent(req.query.type, req.query.value);
});

server.get('/TooLazyToStandUp/Trackpad/UserText', function (req, res) {

    edgeController.keyboardEvent("TextEntry", req.query.text);
    res.redirect('/TooLazyToStandUp/Trackpad/Trackpad.html');
});

server.get('/TooLazyToStandUp/Shutdown', function (req, res) {

    res.sendfile('');
    edgeController.shutdown();
});

// Fire up the server!
server.listen(port);
console.log('Server started! At http://localhost:' + port);