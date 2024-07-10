/*const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector("controls-container");
let cards;
let interval;
;*/

const emojis = [
  "🥶",
  "🥶",
  "😈",
  "😈",
  "👿",
  "👿",
  "😡",
  "😡",
  "🥵",
  "🥵",
  "🤬",
  "🤬",
  "🎃",
  "🎃",
  "🤮",
  "🤮",
  "😰",
  "😰",
  "😨",
  "😨",
];

document.addEventListener("DOMContentLoaded", (event) => {
  const startButton = document.getElementById("start");
  startButton.addEventListener("click", () => {
    window.location.reload();
  });
});

let shuf_emojis = emojis.sort(function () {
  return Math.random() > 0.5 ? 1 : -1;
});

for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuf_emojis[i];

  box.onclick = function () {
    if (box.classList.contains("boxOpen")) {
      box.classList.remove("boxOpen");
      box.classList.add("closed");
    } else {
      box.classList.remove("closed");
      box.classList.add("boxOpen");
    }
  };

  document.querySelector(".game-container").appendChild(box);
}

/*box.onclick = function(){
  this.classList.add('boxOpen')
  setTimeout(function(){
    if(document.querySelectorAll('.boxOpen').length > 1){
      if(document.querySelectorAll('.boxOpen'[0].innerHTML == 
        document.querySelectorAll('.')
      ))
    }
  })
}*/

