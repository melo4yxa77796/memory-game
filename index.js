const apiUrl =
  "https://raw.githubusercontent.com/melo4yxa77796/melo4yxa77796.github.io/main/images.json";

let emojis = [];
let moveCounter = 0;
let startTime;
let elapsedTime = 0;
let timerInterval;
let maxTime;
let maxMoves;
let lockBoard = false;
let firstCard, secondCard;

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");

  startButton.addEventListener("click", startGame);
  stopButton.addEventListener("click", stopGame);

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
      if (elapsedTime >= maxTime) {
        alert("Time's up!");
        stopGame();
      }
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
    if (moveCounter >= maxMoves) {
      alert("Move limit reached!");
      stopGame();
    }
  }

  function onCardClick() {
    if (
      lockBoard ||
      this.classList.contains("boxOpen") ||
      this.classList.contains("boxMatch")
    ) {
      return;
    }

    this.classList.add("boxOpen");
    moveCounter++;
    updateMoveCounter();

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;

    setTimeout(() => {
      if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        firstCard.classList.add("boxMatch");
        secondCard.classList.add("boxMatch");

        firstCard.classList.add("boxHidden");
        secondCard.classList.add("boxHidden");
      } else {
        firstCard.classList.remove("boxOpen");
        secondCard.classList.remove("boxOpen");
      }

      firstCard = null;
      secondCard = null;
      lockBoard = false;

      if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert("win");
        stopGame();
      }
    }, 1000);
  }

  function createGameBoard() {
    const gameContainer = document.querySelector(".game-container");
    gameContainer.innerHTML = "";
    let shuffledEmojis = emojis.sort(() => (Math.random() > 0.5 ? 1 : -1));

    shuffledEmojis.forEach((emoji) => {
      let box = document.createElement("div");
      box.className = "item";
      box.innerHTML = emoji;
      box.dataset.emoji = emoji;
      box.onclick = onCardClick;
      gameContainer.appendChild(box);
    });
  }

  function startGame() {
    maxTime = parseInt(document.getElementById("maxTime").value, 10) * 60000;
    maxMoves = parseInt(document.getElementById("maxMoves").value, 10);

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
