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
  const stopButton = document.getElementById("stop");

  startButton.addEventListener("click", startGame);
  stopButton.addEventListener("click", stopGame);
  stopButton.disabled = true;

  let moveCounter = 0;

  function initializeGame() {
    const gameContainer = document.querySelector(".game-container");
    gameContainer.innerHTML = "";
    let shuf_emojis = emojis.sort(() => (Math.random() > 0.5 ? 1 : -1));
    moveCounter = 0;
    document.getElementById("moveCounter").innerHTML = `Moves: ${moveCounter}`;

    for (let i = 0; i < emojis.length; i++) {
      let box = document.createElement("div");
      box.className = "item";
      box.innerHTML = shuf_emojis[i];
      box.dataset.emoji = shuf_emojis[i];

      box.onclick = function () {
        if (
          !this.classList.contains("boxOpen") &&
          !this.classList.contains("boxMatch")
        ) {
          this.classList.add("boxOpen");
          moveCounter++;
          document.getElementById(
            "moveCounter"
          ).innerHTML = `Moves: ${moveCounter}`;

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

            if (
              document.querySelectorAll(".boxMatch").length === emojis.length
            ) {
              alert("win");
              stopGame();
            }
          }, 500);
        }
      };

      gameContainer.appendChild(box);
    }
  }

  let startTime;
  let elapsedTime = 0;
  let timerInterval;

  function timeToString(time) {
    let diffInMin = time / 60000;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    return `Time: ${formattedMM}:${formattedSS}`;
  }

  function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      document.getElementById("timer").innerHTML = timeToString(elapsedTime);
    }, 1000);
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
  }

  function stopTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    document.getElementById("timer").innerHTML = "Time: 00:00";
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
  }

  function startGame() {
    stopTimer();
    initializeGame();
    startTimer();
  }

  function stopGame() {
    stopTimer();
    initializeGame();
  }

  initializeGame();
});
