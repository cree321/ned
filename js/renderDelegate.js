// Scene Description
var displacement = [0,0,0];
var rotation = [0,0];
var scale = [0,0,0];
// Scene Physics
var velocity = [0,0,0];

onmessage = (e) => {
  console.log(e);
  console.log(e.data);
  /*switch(e.type) {
    case "mousemove":
      rotation[0] = rotation[0] %360 + e.movementY;
      rotation[1] = rotation[1] %360 + e.movementX;
      postMessage("rotateX("+rotation[1]+"deg) rotateY("+rotation[0]+"deg)");
      break;
    case "keydown":
      if (e.repeat) {
        e.preventDefault()
      } else {
        switch(e.key) {
          case "w":
            translation[2] = 10;
            break;
          case "a":
            translation[0] = -10;
            break;
          case "s":
            translation[2] = -10;
            break;
          case "d":
            translation[0] = 10;
            break;
        }
      }
      displacement.forEach(value, i => value += translation[i]);
      postMessage("translate3d("+displacement[0]+"px,"+displacement[1]+"px,"+displacement[2]+"px)");
      break;
    case "keyup":
      switch(e.key) {
        case "w":
        case "s":
          translation[2] = 0;
          break;
        case "a":
        case "d":
          translation[0] = 0;
          break;
        }
      break;
  }*/
}

function something() {
  rotation[0] = rotation[0] % 360 + 5;
  //rotation[1] = rotation[1] % 360 + 5;
  escena.style.transform = "rotateY("+rotation[0]+"deg)";//rotateY("+rotation[1]+"deg)";
}
