"use strict";
/*\\ Asynchronous Code \\*/
var renderDelegate = new Worker("js/renderDelegate.js");

window.addEventListener("keydown", function(e) {
  renderDelegate.postMessage(e.key.data);
});
window.addEventListener("keyup",function(e) {
  renderDelegate.postMessage(e.key.data);
});
renderDelegate.onmessage = (e) => {
  console.log("Response: "+e);
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
