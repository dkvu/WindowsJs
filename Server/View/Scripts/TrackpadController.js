var windowsJsController = function()
{
    var mouseState = "down";
    var start;
    var oldTime = 0;
    var startX = 0;
    var startY = 0;

    function init()
    {   
        //Turning off Windows dragging for Phone Browsers
        document.ontouchmove = function (event) { event.preventDefault(); }

        //Add Listeners
        document.getElementById("MouseClick").onclick = function () { changeMouseClickState(); }
        document.getElementById("Enter").onclick = function () { Command("KeyBoardEvent?type=KeyPress&value=Enter"); }
        document.getElementById("ShutDown").addEventListener('touchstart', startButtonHold, false);
        document.getElementById("ShutDown").addEventListener('touchend', endButtonHold, false);
        document.getElementById("BackSpace").onclick = function () { Command("KeyBoardEvent?type=KeyPress&value=Back"); }

        var canvas = document.getElementById("Trackpad");
        canvas.addEventListener('click', LeftClick, false);
        canvas.addEventListener('touchmove', TouchMove, false);
        canvas.addEventListener('touchstart', TouchStart, false);
        canvas.addEventListener('touchend', TouchEnd, false);
    }

    function changeMouseClickState()
    {
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

    function startButtonHold() {
        start = new Date().getTime();
    }

    function endButtonHold() {
        if ((new Date().getTime() - start) > 2000) {
            Command("Shutdown");
        }
    }

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

    function Command(str) {

        var urlCommand = '/TooLazyToStandUp/' + str;
        var xmlHttpRequestCommand = new XMLHttpRequest();

        xmlHttpRequestCommand.open('GET', urlCommand, true);
        xmlHttpRequestCommand.send();
    }

    return { init: init}
}

var WindowsJsController = new windowsJsController();

document.addEventListener("DOMContentLoaded", WindowsJsController.init);