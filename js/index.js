var reproduccion = new Worker("periferico.js");

var enviaMensaje = function(e) {
  reproduccion.postMessage(e);
};

let escena;
document.addEventListener("DOMContentLoaded", (e) => {
  escena = document.getElementById("escena");
  window.addEventListener("keydown", enviaMensaje);
  //window.addEventListener("keyup", enviaMensaje);
});
reproduccion.onmessage = function(e) {
  escena.style.transform = e.data;
}
//document.addEventListener("load", (e) => {});
