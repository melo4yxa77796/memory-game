const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector("controls-container");
let cards;
let interval;
;


const emojis=["🥶","🥶","😈","😈","👿","👿","😡","😡","🥵","🥵","🤬","🤬","🎃","🎃","🤮","🤮","😰","😰","😨","😨"];
let shuf_emojis = emojis.sort(function() {
    return (Math.random() > 0.5) ? 1 : -1;
});

 for( let i = 0; i<emojis.length; i++){
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuf_emojis[i];
    box.onclick = function() {
        this.classList.add('boxOpen')
        
    }
    document.querySelector('.game-container').appendChild(box);
 }




