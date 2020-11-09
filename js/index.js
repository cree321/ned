var reproduccion = new Worker("js/periferico.js");

var enviaMensaje = function(e) {
  var obj = JSON.parse(JSON.stringify(e));
  reproduccion.postMessage(obj);
};

let escena;
window.addEventListener("DOMContentLoaded", (e) => {
  escena = document.getElementById("escena");
  document.addEventListener("keydown", enviaMensaje);
  //window.addEventListener("keyup", enviaMensaje);
});
reproduccion.onmessage = function(e) {
  escena.style.transform = e.data;
}
//document.addEventListener("load", (e) => {});
