"use strict";
/*\\ Asynchronous Code \\*/
var renderDelegate = new Worker("js/renderDelegate.js");

// Pointer
/*window.addEventListener("pointerdown", (e) => renderDelegate.postMessage({e}));
window.addEventListener("pointerup", (e) => renderDelegate.postMessage({e}));*/
window.addEventListener("mousemove", (e) => renderDelegate.postMessage(Object.assign({}, e)));
// Keyboard
window.addEventListener("keydown", (e) => renderDelegate.postMessage(Object.assign({}, e)));
window.addEventListener("keyup", (e) => renderDelegate.postMessage(Object.assign({}, e)));
// Worker
renderDelegate.onmessage = (e) => {escena.style.transform = e.data;}
//
/*\\ Synchronous Code \\*/
const escena = document.getElementById("escena");





function loop() {
  
}
/*rotation.forEach(value, i => value += deltaRotation[i]);
  deltaRotation = [0,0];*/

window.onload = (event) => {
  //const escena = document.getElementById("escena");
  //var gameLoop = setInterval(loop, 50);
}
