
var text;
var w = null;
window.onload = function () {
    text = document.getElementById("txt");

    w = new Worker("Scripts/woker2.js");
    w.onmessage = function (e) {
        text.innerHTML = e.data;
    }
}