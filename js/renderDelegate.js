"use strict";
/* Game State */
var pause = 0;
var debug = 0;
/* Scene Description */
var displacement = [0,0,0];
var rotation = [0,0];
var scale = [0,0,0];
/* Scene Physics */
var acceleration = [0,0,0];// which direction is the viewer intending to move
var velocity = [0,0,0];// which direction/magnitude is the viewer moving
var rotV = [0,0];// rotation velocity
var maxFall = 0;// distance to floor
// POST: Input Map???


onmessage = (message) => {
  var e = message.data;
  console.log(e);
  switch(e.type) {
    case 2:
      rotation[0] = rotation[0] %360 + e.movementY;
      rotation[1] = rotation[1] %360 + e.movementX;
      postMessage("rotateX("+rotation[1]+"deg) rotateY("+rotation[0]+"deg)");
      break;
    case 1:
      switch(e.code) {
        // movement
        case "KeyW":
          velocity[2] = 10;
          break;
        case "KeyA":
          velocity[0] = 10;
          break;
        case "KeyS":
          velocity[2] = -10;
          break;
        case "KeyD":
          velocity[0] = -10;
          break;
        // rotation
        case "ArrowUp":
          rotV[1] = 5;
          break;
        case "ArrowLeft":
          rotV[0] = -5;
          break;
        case "ArrowDown":
          rotV[1] = -5;
          break;
        case "ArrowRight":
          rotV[0] = 5;
          break;
        // state
        case "Escape":
          pause = (pause + 1)%2;
          break;
        case "Equal":
          debug = (debug + 1)%2;
          break;
      }
      /*displacement.forEach((value, i) => value += translation[i]);*/
      //postMessage("translate3d("+displacement[0]+"px,"+displacement[1]+"px,"+displacement[2]+"px)");
      break;
    case 0:
      switch(e.code) {
        // movement
        case "KeyW":
        case "KeyS":
          velocity[2] = 0;
          break;
        case "KeyA":
        case "KeyD":
          velocity[0] = 0;
          break;
        // rotation
        case "ArrowUp":
        case "ArrowDown":
          rotV[1] = 0;
          break;
        case "ArrowLeft":
        case "ArrowRight":
          rotV[0] = 0;
          break;
        }
      break;
  }
}

//function gravity() {}

function sceneUpdate() {
  //gravity();
  if(velocity[0] || velocity[1] || velocity[2]) {
  //velocity.forEach((value, i) => displacement[i] += value);
  displacement[0] += velocity[0]*Math.sin(rotation[0] * Math.PI / 180);
  displacement[2] += velocity[0]*Math.cos(rotation[0] * Math.PI / 180);
  displacement[2] += velocity[2]*Math.sin(rotation[0] * Math.PI / 180);
  displacement[0] += velocity[2]*Math.cos(rotation[0] * Math.PI / 180);
  postMessage({type: 0, transform: "translate3d("+displacement[0]+"px,"+displacement[1]+"px,"+displacement[2]+"px)"});
  }
  if(rotV[0] || rotV[1]) {
    rotation[0] = (rotation[0] + rotV[0])%360;
    rotation[1] = (rotation[1] + rotV[1])%360;
    postMessage({type: 1, transform: "rotateX("+rotation[1]+"deg) rotateY("+rotation[0]+"deg)"});
  }
}

setInterval(sceneUpdate, 50);
