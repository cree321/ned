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
          acceleration[2] = 0.1;
          break;
        case "KeyA":
          acceleration[0] = 0.1;
          break;
        case "KeyS":
          acceleration[2] = -0.1;
          break;
        case "KeyD":
          acceleration[0] = -0.1;
          break;
      }
      /*displacement.forEach((value, i) => value += translation[i]);*/
      postMessage("translate3d("+displacement[0]+"px,"+displacement[1]+"px,"+displacement[2]+"px)");
      break;
    case 0:
      switch(e.code) {
        case "KeyW":
        case "KeyS":
          acceleration[2] = 0;
          break;
        case "KeyA":
        case "KeyD":
          acceleration[0] = 0;
          break;
        }
      break;
  }
}

function sceneUpdate() {
  //acceleration.forEach((value, i) => {if(value = 0) velocity[i] += value});
  velocity.forEach((value, i) => {if(Math.abs(velocity) < 20) value += acceleration[i]});
  velocity.forEach((value, i) => {if(acceleration[i] = 0) value -= value/10});
  displacement.forEach((value, i) => value += velocity[i]);
  
}

setInterval(sceneUpdate, 50);
