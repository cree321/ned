"use strict";
/*\\ Asynchronous Code \\*/
var renderDelegate = new Worker("renderDelegate.js");

window.addEventListener("keydown", function(e) {
  renderDelegate.postMessage(e);
});
window.addEventListener("keyup",function(e) {
  renderDelegate.postMessage(e);
});
renderDelegate.onmessage = (e) => {
  console.log("Response: "+e.code);
}
//
/*\\ Synchronous Code \\*/






function loop() {
  
}
/*rotation.forEach(value, i => value += deltaRotation[i]);
  deltaRotation = [0,0];*/

window.onload = (event) => {
  const escena = document.getElementById("escena");
  //var gameLoop = setInterval(loop, 50);
}
