"use strict";
const renderDelegate = new Worker("js/renderDelegate.js");
renderDelegate.onmessage = (e) => {
  console.log(e.data);
  if(e.data.type) {camera.style.transform = "translateZ(800px); "+e.data.transform;console.log(e.data);}
  else {escena.style.transform = e.data.transform;}
}
/*const sceneDelegate = new Worker("js/sceneDelegate.js");
sceneDelegate.onmessage = (e) => {console.log(e);}*/


window.onload = (event) => {
  const camera = document.getElementById("camera");
  const escena = document.getElementById("escena");
  window.addEventListener("keydown", (e) => {if(!e.repeat) renderDelegate.postMessage({type: 1, code: e.code});});
  window.addEventListener("keyup", (e) => renderDelegate.postMessage({type: 0, code: e.code}));
  //window.addEventListener("pointerdown", (e) => renderDelegate.postMessage({e}));
  //window.addEventListener("pointerup", (e) => renderDelegate.postMessage({e}));
  //window.addEventListener("mousemove", (e) => renderDelegate.postMessage(Object.assign({}, e)));
  //var gameLoop = setInterval(loop, 50);
}
