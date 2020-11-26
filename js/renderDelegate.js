"use strict";
// Game State
var pause = 0;
var debug = 0;
// Scene Description
var displacement = [0,0,0];
var rotation = [0,0];
var scale = [0,0,0];
// Scene Physics
var acceleration = [0,0,0];// which direction is the viewer intending to move
var velocity = [0,0,0];// which direction/magnitude is the viewer moving
var rotV = [0,0];// rotation velocity
// Input Map???

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
          rotV[1] = 10;
          break;
        case "ArrowLeft":
          rotV[0] = 10;
          break;
        case "ArrowDown":
          rotV[1] = -10;
          break;
        case "ArrowRight":
          rotV[0] = -10;
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

var change = 0;// has the scene transform changed?
var commit = "";
function sceneUpdate() {
  if(velocity[0] || velocity[1] || velocity[2]) {change = 1;
  //acceleration.forEach((value, i) => {if(value = 0) velocity[i] += value});
  //velocity.forEach((value, i) => {if(Math.abs(velocity) < 20) value += acceleration[i]});
  velocity.forEach((value, i) => displacement[i] += value);
  //displacement.forEach((value, i) => value += velocity[i]);
  //console.log(displacement[0]+", "+displacement[1]+", "+displacement[2]);
  }
  if(rotV[0] || rotV[1]) {change = 1;
    rotation[0] = (rotation[0] + rotV[0])%360;
    rotation[1] = (rotation[1] + rotV[1])%360;
  }
  if(change) {
    commit = "translate3d("+displacement[0]+"px,"+displacement[1]+"px,"+displacement[2]+"px) rotateX("+rotation[1]+"deg) rotateY("+rotation[0]+"deg)";
    postMessage(commit);
  }
}

setInterval(sceneUpdate, 50);
