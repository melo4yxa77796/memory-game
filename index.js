const apiUrl =
  "https://raw.githubusercontent.com/melo4yxa77796/melo4yxa77796.github.io/main/images.json"; // Replace with your API URL

let emojis = [];
let moveCounter = 0;
let startTime;
let elapsedTime = 0;
let timerInterval;

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");

  startButton.addEventListener("click", startGame);
  stopButton.addEventListener("click", stopGame);
  stopButton.disabled = true;

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
    timerInterval = setInterval(() => {
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

  function updateMoveCounter() {
    document.getElementById("moveCounter").innerHTML = `Moves: ${moveCounter}`;
  }

  function onCardClick() {
    if (
      !this.classList.contains("boxOpen") &&
      !this.classList.contains("boxMatch")
    ) {
      this.classList.add("boxOpen");
      moveCounter++;
      updateMoveCounter();

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
          stopGame();
        }
      }, 500);
    }
  }

  function createGameBoard() {
    const gameContainer = document.querySelector(".game-container");
    gameContainer.innerHTML = "";
    let shuf_emojis = emojis.sort(() => (Math.random() > 0.5 ? 1 : -1));

    shuf_emojis.forEach((emoji) => {
      let box = document.createElement("div");
      box.className = "item";
      box.innerHTML = emoji;
      box.dataset.emoji = emoji;
      box.onclick = onCardClick;
      gameContainer.appendChild(box);
    });
  }

  function startGame() {
    stopTimer();
    moveCounter = 0;
    updateMoveCounter();
    createGameBoard();
    startTimer();
    document
      .querySelectorAll(".item")
      .forEach((card) => card.classList.add("enabled"));
  }

  function stopGame() {
    stopTimer();
    moveCounter = 0;
    updateMoveCounter();
    createGameBoard();
    document
      .querySelectorAll(".item")
      .forEach((card) => card.classList.remove("enabled"));
  }

  function fetchCardData() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        emojis = data;
        createGameBoard();
      })
      .catch((error) => {
        console.error("Error fetching card data:", error);
      });
  }

  fetchCardData();
});
