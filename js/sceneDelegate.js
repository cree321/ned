"use strict";
var commit = ``;
const cap0ul = new Request("assets/cap0.json");

parseMap(cap0ul);

onmessage = () => {
  /*cap0.hall.forEach((value) => {
    commit += `<div class="geo" style="transform: translate3d(${value.t[0]}px,${value.t[1]}px,${value.t[2]}px) scale3d(${value.s[0]},${value.s[1]},${value.s[2]}) rotateX(${value.r[0]}) rotateY(${value.r[1]})">
</div>`;
  });*/
  postMessage(commit);
}

function parseMap(request) {
  commit = ``;
  fetch(request)
    .then(response => response.json())
    .then(data => {
      data.hall.forEach((value) => {
        commit += `<div class="geo" style="transform: translate3d(${value.t[0]}px,${value.t[1]}px,${value.t[2]}px) scale3d(${value.s[0]},${value.s[1]},${value.s[2]}) rotateX(${value.r[0]}) rotateY(${value.r[1]})">
</div>`;
  });
    }).catch(console.error);
}
