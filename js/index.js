"use strict";
const renderDelegate = new Worker("js/renderDelegate.js");
renderDelegate.onmessage = (e) => {escena.style.transform = e.data;}


window.onload = (event) => {
  const escena = document.getElementById("escena");
  window.addEventListener("keydown", (e) => renderDelegate.postMessage({type: 1, code: e.code, repeat: e.repeat}));
  window.addEventListener("keyup", (e) => renderDelegate.postMessage({type: 0, code: e.code}));
  //window.addEventListener("pointerdown", (e) => renderDelegate.postMessage({e}));
  //window.addEventListener("pointerup", (e) => renderDelegate.postMessage({e}));
  //window.addEventListener("mousemove", (e) => renderDelegate.postMessage(Object.assign({}, e)));
  //var gameLoop = setInterval(loop, 50);
}
