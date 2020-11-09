onmessage = (e) => {
  console.log(e);
  postMessage(e);
}

function something() {
  rotation[0] = rotation[0] % 360 + 5;
  //rotation[1] = rotation[1] % 360 + 5;
  escena.style.transform = "rotateY("+rotation[0]+"deg)";//rotateY("+rotation[1]+"deg)";
}
