var rotation = [0,0];
var deltaRotation = [0,0];

onmessage = function(e) {
  if (e.defaultPrevented) {
    console.log("Default.");
    return; // Do nothing if the event was already processed
  }
  console.log(e.key + "pressed.");
  switch (e.key) {
    case "ArrowDown":// code for "down arrow" key press.
      deltaRotation[0] += -20;
      break;
    case "ArrowUp":// code for "up arrow" key press.
      deltaRotation[0] += 20;
      break;
    case "ArrowLeft":// code for "left arrow" key press.
      deltaRotation[1] += -20;
      break;
    case "ArrowRight":// code for "right arrow" key press.
      deltaRotation[1] += 20;
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  e.preventDefault();


  rotation.forEach(value, i => value += deltaRotation[i]);
  deltaRotation = [0,0];

  return `rotateX(${rotation[0]}deg) rotateY(rotation[1]deg)`;
}
