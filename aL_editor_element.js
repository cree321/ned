"use strict";
// aL_editor_element.js
class ActionLayerEditor extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.style.display = "none";
    this.style.position = "absolute";
    this.style.touchAction = "none";
    this.style.width = "100vw";
    this.style.height = "60vh";
    this.style.top = "0px";
    this.style.left = "0px";
    const shadowDOM = this.attachShadow({ mode: "open" });
    shadowDOM.innerHTML = `<style>
    .aL-window {
      height:40%;
    }
    .aL-paint {
      height: 60%;
      padding: 10px;
    }
    .aL-options {
      height:20%;
    }
    .aL-canvas {
      height:80%;
      float: right;
      border: 1px solid black;
    }
  </style>
  <div class="aL-window"></div>
  <div class="aL-paint">
    <div class="aL-options">
      <input class="undo" type="button" value="undo" />
      <input class="redo" type="button" value="redo" />
      <label>Import image:</label>
      <input class="file-import" type="file" accept="image/*,.json" />
      <input class="file-export" type="button" value="save" />
      <input class="stroke-color" type="color" value="#000000" />
      <label>Brush weight:</label>
      <input class="stroke-weight" type="number" value="1" min="0.1" max="10" step="0.1" /><br>
      <label>Width:</label>
      <input class="texture-width" type="text" value="128px" size="6" /><br>
      <label>Height:</label>
      <input class="texture-height" type="text" value="128px" size="6" /><br>
      <label>Enable Grid:</label>
      <input class="display-grid" type="checkbox" checked />
    </div>
    <canvas class="aL-canvas"></canvas>
  </div>`;
  const aL_window_element = shadowDOM.querySelector(".aL-window");
  aL_window_element.addEventListener("pointerup", (event) => this.style.display = "none");

  // Event listeners not functioning?
  const aL_canvas_element = shadowDOM.querySelector(".aL-canvas");
  const aL_width_input_element = shadowDOM.querySelector(".texture-width");
  const aL_height_input_element = shadowDOM.querySelector(".texture-height");
  aL_width_input_element.onchange = (event) => aL_canvas_element.width = parseInt(aL_width_input_element.value);
  aL_height_input_element.onchange = (event) => aL_canvas_element.height = parseInt(aL_height_input_element.value);
  }

  
// CANVAS will NOT RESIZE width/height
  openEditorPaint(target_element) {
    this.style.display = "inline-block";
    const shadowDOM = this.shadowRoot;
    const aL_canvas_element = shadowDOM.querySelector(".aL-canvas");
    const aL_width_input_element = shadowDOM.querySelector(".texture-width");
    const aL_height_input_element = shadowDOM.querySelector(".texture-height");

    
    // aL_width_input_element.onchange = (event) => aL_canvas_element.width = parseInt(aL_width_input_element.value);
    aL_width_input_element.value = target_element.style.width;
    aL_canvas_element.width = parseInt(aL_width_input_element.value)

    // aL_height_input_element.onchange = (event) => aL_canvas_element.height = parseInt(aL_height_input_element.value);
    aL_height_input_element.value = target_element.style.height;
    aL_canvas_element.height = parseInt(aL_height_input_element.value);

    console.log(aL_canvas_element.width);

// aL_editor_control.js START
  function setupPaint() {
    //const shadowDOM = this.shadowRoot;
    const aL_canvas_element = shadowDOM.querySelector(".aL-canvas");
    
    const aL_canvas_scale = parseFloat(aL_canvas_element.width) / parseFloat(aL_canvas_element.getBoundingClientRect().width);//aL_canvas_element.offsetWidth);
    const context = aL_canvas_element.getContext("2d");
    context.imageSmoothingEnabled = false;
    context.strokeStyle = "black";
    context.lineWidth = 5;
    
    function beginPainting(event) {
      console.log("drawing now");

      context.beginPath();
      context.moveTo(event.offsetX * aL_canvas_scale, event.offsetY * aL_canvas_scale);
      aL_canvas_element.onpointermove = draw;
      aL_canvas_element.onpointerup = endPainting;
      aL_canvas_element.onpointerleave = endPainting;
      console.log("x"+ parseInt(event.offsetX * aL_canvas_scale) +", y"+ parseInt(event.offsetY * aL_canvas_scale));
      console.log(parseFloat(aL_canvas_element.getBoundingClientRect().width) +"/"+ parseFloat(aL_canvas_element.offsetWidth) +" = "+aL_canvas_scale);
      if(event.isPrimary) {
        
      }
    }
    function resumePainting(event) {
      if(event.isPrimary) {
        context.moveTo(event.clientX, event.clientY);
        context.beginPath();
      }
    }
    var y = 0;
    function draw(event) {
      event.preventDefault();
      context.lineTo(event.offsetX * aL_canvas_scale, event.offsetY * aL_canvas_scale);
      context.stroke();
      //context.beginPath();
      console.log("drawing...");
    }
    function endPainting(event) {
      aL_canvas_element.onpointermove = null;
      aL_canvas_element.onpointerup = null;
      aL_canvas_element.onpointerleave = null;
      context.closePath();
      console.log("done drawing");

      const canvas_data = aL_canvas_element.toDataURL("image/png");
      console.log(canvas_data);
      target_element.style.backgroundImage = `url(${canvas_data})`;
    }
    aL_canvas_element.onpointerdown = beginPainting;
    //aL_canvas_element.onpointerenter = resumePainting;
  }
// aL_editor_control.js END
    
    //const context = aL_canvas_element.getContext("2d");
    //context.fillStyle = "blue";
    setupPaint();
  }
}

customElements.define("al-editor", ActionLayerEditor);

// aL_window_control.js
var last_target;
var last_event_deltaT;
function doubleTapFocus(event) {
  const elapsed_deltaT = Date.now() - last_event_deltaT;
  if((event.target == last_target) && (elapsed_deltaT < 500)) {
    const aL_editor_element = document.querySelector("al-editor");
    aL_editor_element.openEditorPaint(event.target);
  } else{
    last_target = event.target;
    last_event_deltaT = Date.now();
  }
}

window.addEventListener("load", (e) => {
  if(!document.querySelector("al-editor")) {
    console.log("added")
    document.body.innerHTML += "<al-editor></al-editor>";
  }
  document.addEventListener("pointerup", doubleTapFocus);
});