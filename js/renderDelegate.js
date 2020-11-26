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
        case "KeyW":
        case "KeyS":
          velocity[2] = 0;
          break;
        case "KeyA":
        case "KeyD":
          velocity[0] = 0;
          break;
        }
      break;
  }
}

function sceneUpdate() {
  if(velocity[0] || velocity[1] || velocity[2]) {
  //acceleration.forEach((value, i) => {if(value = 0) velocity[i] += value});
  //velocity.forEach((value, i) => {if(Math.abs(velocity) < 20) value += acceleration[i]});
  velocity.forEach((value, i) => displacement[i] += value);
  //displacement.forEach((value, i) => value += velocity[i]);
  //console.log(displacement[0]+", "+displacement[1]+", "+displacement[2]);
  postMessage("translate3d("+displacement[0]+"px,"+displacement[1]+"px,"+displacement[2]+"px)");
  }
}

setInterval(sceneUpdate, 50);
