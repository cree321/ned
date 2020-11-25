// Scene Description
var displacement = [0,0,0];
var rotation = [0,0];
var scale = [0,0,0];
// Scene Physics
var translation = [0,0,0];
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
      /*if (e.repeat) {
        message.preventDefault();
      } else {*/
        switch(e.code) {
          case "KeyW":
            displacement[2] += 10;
            break;
          case "KeyA":
            displacement[0] += 10;
            break;
          case "KeyS":
            displacement[2] += -10;
            break;
          case "KeyD":
            displacement[0] -= 10;
            break;
        }
      //}
      /*displacement.forEach((value, i) => value += translation[i]);*/
      postMessage("translate3d("+displacement[0]+"px,"+displacement[1]+"px,"+displacement[2]+"px)");
      break;
    case 0:
      switch(e.code) {
        case "KeyW":
        case "KeyS":
          translation[2] = 0;
          break;
        case "KeyA":
        case "KeyD":
          translation[0] = 0;
          break;
        }
      break;
  }
}

function something() {
  rotation[0] = rotation[0] % 360 + 5;
  //rotation[1] = rotation[1] % 360 + 5;
  escena.style.transform = "rotateY("+rotation[0]+"deg)";//rotateY("+rotation[1]+"deg)";
}
