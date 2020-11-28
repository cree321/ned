"use strict";
var commit = ``;
var isParsing = 0;
const cap0ul = new Request("https://raw.githubusercontent.com/cree321/ned/master/assets/cap0.json");

parseMap(cap0ul);

onmessage = (message) => {
  /*cap0.hall.forEach((value) => {
    commit += `<div class="geo" style="transform: translate3d(${value.t[0]}px,${value.t[1]}px,${value.t[2]}px) scale3d(${value.s[0]},${value.s[1]},${value.s[2]}) rotateX(${value.r[0]}) rotateY(${value.r[1]})">
</div>`;
  });*/
  var timeout = setTimeout(() => {
    clearInterval(checker);
    console.log("sD: Timeout");
  }, 10100);
  var checker = setInterval(() => {
    if(!isParsing) {
      clearTimeout(timeout);
      postMessage(commit);
      console.log("sD: Success!");
      clearInterval(checker);
    }
  }, 1000);
}

function parseMap(request) {
  commit = ``;
  fetch(request)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      data.hall.forEach((value) => {
        commit += `<div class="geo" style="transform: translate3d(${value.t[0]}px,${value.t[1]}px,${value.t[2]}px) scale3d(${value.s[0]},${value.s[1]},${value.s[2]}) rotateX(${value.r[0]}deg) rotateY(${value.r[1]}deg);"></div>`;
      });
      console.log(commit);
    }).catch(console.error);
}
