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

/*let shuf_emojis = emojis.sort(function () {
  return Math.random() > 0.5 ? 1 : -1;
});*/
const gameContainer = document.querySelector(".game-container");
let shuf_emojis = emojis.sort(() => (Math.random() > 0.5 ? 1 : -1));

for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuf_emojis[i];
  box.dataset.emoji = shuf_emojis[i];

  box.onclick = function () {
    this.classList.add("boxOpen");
    setTimeout(() => {
      const openBoxes = document.querySelectorAll(".boxOpen");
      if (openBoxes.length > 1) {
        if (openBoxes[0].dataset.emoji === openBoxes[1].dataset.emoji) {
          openBoxes[0].classList.add("boxMatch");
          openBoxes[1].classList.add("boxMatch");
        }
        openBoxes[0].classList.remove("boxOpen");
        openBoxes[1].classList.remove("boxOpen");
      }

      if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert("win");
      }
    }, 500);
  };

  gameContainer.appendChild(box);
}


