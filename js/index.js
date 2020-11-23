"use strict";
const renderDelegate = new Worker("js/renderDelegate.js");
renderDelegate.onmessage = (e) => {escena.style.transform = e.data;}


function replacer(key, value) {
  // Filtering out properties
  if (typeof value === 'string') {
    return undefined;
  }
  return value;
}

window.onload = (event) => {
  const escena = document.getElementById("escena");
  window.addEventListener("keydown", (e) => renderDelegate.postMessage(JSON.stringify(e, ['type', 'data'])));
  window.addEventListener("keyup", (e) => renderDelegate.postMessage(Object.assign({}, e)));
  //window.addEventListener("pointerdown", (e) => renderDelegate.postMessage({e}));
  //window.addEventListener("pointerup", (e) => renderDelegate.postMessage({e}));
  //window.addEventListener("mousemove", (e) => renderDelegate.postMessage(Object.assign({}, e)));
  //var gameLoop = setInterval(loop, 50);
}
