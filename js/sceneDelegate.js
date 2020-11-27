"use strict";
var cap0 = JSON.parse("assets/cap0.json");

onmessage = () => {
  var commit = ``;
  cap0.hall.forEach((value) => {
    commit += `<div class="geo" style="transform: translate3d(${value.t[0]}px,${value.t[1]}px,${value.t[2]}px) scale3d(${value.s[0]},${value.s[1]},${value.s[2]}) rotateX(${value.r[0]}) rotateY(${value.r[1]})">
</div>`;
  });
  postMessage(commit);
}
