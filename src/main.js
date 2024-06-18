"use strict";

var btnTutorial = document.querySelectorAll("#btnTutorial");
btnTutorial.forEach(element => {
    element.addEventListener("click", e => {
        document.querySelector("#tutorial").checked = true;
    })
})