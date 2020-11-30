"use strict";
const renderDelegate = new Worker("js/renderDelegate.js");
renderDelegate.onmessage = (e) => {
  console.log(e.data.type);
  if(e.data.type) {camera.style.transform = "translateZ(800px) "+e.data.transform;}
  else {escena.style.transform = e.data.transform;}
}
const sceneDelegate = new Worker("js/sceneDelegate.js");
sceneDelegate.onmessage = (e) => {escena.innerHTML = e.data;}

window.onload = (event) => {
  const titlecard = document.getElementById("cap0");
  const viewport = document.getElementById("viewport");
  const camera = document.getElementById("camera");
  const escena = document.getElementById("escena");
  
  titlecard.addEventListener("click", (e) => {
    sceneDelegate.postMessage(null);
    titlecard.style.animationName = "viewport";
    titlecard.style.animationDuration = "3s";
    titlecard.style.animationFillMode = "both";
    setTimeout(() => {
      viewport.style.opacity = 1;
      titlecard.style.animation = none;
      titlecard.style.opacity = 0;
    }, 3010);
    window.addEventListener("keydown", (e) => {if(!e.repeat) renderDelegate.postMessage({type: 1, code: e.code});});
    window.addEventListener("keyup", (e) => renderDelegate.postMessage({type: 0, code: e.code}));
  }, { once: true });
  //window.addEventListener("pointerdown", (e) => renderDelegate.postMessage({e}));
  //window.addEventListener("pointerup", (e) => renderDelegate.postMessage({e}));
  //window.addEventListener("mousemove", (e) => renderDelegate.postMessage(Object.assign({}, e)));
  //var gameLoop = setInterval(loop, 50); IN renderDelegate
}

