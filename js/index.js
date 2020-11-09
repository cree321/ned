var reproduccion = new Worker("js/periferico.js");

var enviaMensaje = function(e) {
  var obj = JSON.parse(JSON.stringify(e));
  reproduccion.postMessage(obj);
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
