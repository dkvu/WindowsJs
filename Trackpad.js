//////////////////////////////////////////Setting Up According to Screen Size /////////////////////////////////////////
var height = screen.availHeight - 64;
var width = screen.availWidth - 25;
var smallHeight = (height * 8) / 100;

//var element = document.getElementById("dumbAssBufferForIPhones");
//element.style.height = 40 + "px";

element = document.getElementById("MouseClick");
element.style.width = (width / 3) + "px";
element.style.height = smallHeight - 5 + "px";

element = document.getElementById("ShutDown");
element.style.width = (width / 3) + "px";
element.style.height = smallHeight - 5 + "px";

element = document.getElementById("BackSpace");
element.style.width = (width / 3) + "px";
element.style.height = smallHeight - 5 + "px";

element = document.getElementById("ButtonDiv");
element.style.paddingBottom = "5px";

element = document.getElementById("InputString");
element.style.width = (width / 2) + "px";
element.style.height = smallHeight - 5 + "px";

element = document.getElementById("Enter");
element.style.width = (width / 3) + "px";
element.style.height = smallHeight - 5 + "px";

element = document.getElementById("TextDiv");
element.style.paddingBottom = "5px";

element = document.getElementById("Trackpad");
element.style.width = width + 8 + "px";
element.style.height = height - (2 * smallHeight) - 40 + "px";

//Turning off Window dragging for Phone Browsers
document.ontouchmove = function (event) {
    event.preventDefault();
}

/////////////////////////////////////////////////////Button/////////////////////////////////////////////////////////
// does not work correctly when using the laptop...
document.getElementById("Enter").onclick = function () {
    Command("KeyBoardEvent?type=KeyPress&value=Enter");
}

var mouseState = "down";

document.getElementById("MouseClick").onclick = function () {
    if (mouseState == "down") {
        Command("MouseEvent?value=down");
        document.getElementById("MouseClick").value = "Up";
        mouseState = "up";
    }
    else {
        Command("MouseEvent?value=up");
        document.getElementById("MouseClick").value = "Down";
        mouseState = "down";
    }
}

document.getElementById("ShutDown").addEventListener('touchstart', startButtonHold, false);
document.getElementById("ShutDown").addEventListener('touchend', endButtonHold, false);

var start;

function startButtonHold() {
    start = new Date().getTime();
}

function endButtonHold() {
    if ((new Date().getTime() - start) > 2000) {
        Command("Shutdown");
    }
}

document.getElementById("BackSpace").onclick = function () {
    Command("KeyBoardEvent?type=KeyPress&value=Back");
}

function Command(str) {

    var urlCommand = '/TooLazyToStandUp/' + str;
    var xmlHttpRequestCommand = new XMLHttpRequest();

    xmlHttpRequestCommand.open('GET', urlCommand, true);
    xmlHttpRequestCommand.send();
}

///////////////////////////////////////////////////Trackpad/////////////////////////////////////////////////////////
var canvas = document.getElementById("Trackpad");

//does not work when using the laptop...
canvas.addEventListener('click', LeftClick, false);
canvas.addEventListener('touchmove', TouchMove, false);
canvas.addEventListener('touchstart', TouchStart, false);
canvas.addEventListener('touchend', TouchEnd, false);

var oldTime = 0;
var startX = 0;
var startY = 0;

function LeftClick() {
    Command("MouseEvent?value=click");
}

function TouchMove(event) {

    var x = event.touches[0].pageX;
    var y = event.touches[0].pageY;

    var urlMove = '/TooLazyToStandUp/MoveCursor?x=' + (x - startX) + '&y=' + (y - startY);
    var xmlHttpRequestMove = new XMLHttpRequest();

    xmlHttpRequestMove.open('GET', urlMove, true);
    xmlHttpRequestMove.send();

    startX = x;
    startY = y;
}

function TouchStart(event) {

    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
}

function TouchEnd() {

    var newTime = new Date().getTime();

    if ((newTime - oldTime) < 200)
        Command("MouseEvent?value=double");

    oldTime = newTime;
}


