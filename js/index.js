"use strict";
/*\\ Asynchronous Code \\*/
var renderDelegate = new Worker("js/renderDelegate.js");

window.addEventListener("keydown", function(e) {
  renderDelegate.postMessage(e.key);
});
window.addEventListener("keyup",function(e) {
  renderDelegate.postMessage(e.key);
});
renderDelegate.onmessage = (e) => {
  console.log("Response: "+e.data);
  escena.style.transform = e.data;
}
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
