"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const curremt0El = document.getElementById("current--0");
const curremt1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// Starting conditions

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  curremt0El.textContent = 0;
  curremt1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
  player0El.classList.add("player--active");
  player1El.classList.add("player--remove");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for roll 1
    if (dice !== 1) {
      // Add dice to score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // curremt0El.textContent = currentScore; // CHANGE LATER
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  // 1. Add current score to active scpre
  scores[activePlayer] += currentScore;
  // score[1] = scores[1] + currentScore
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. Check if score >= 100
  if (scores[activePlayer] >= 100) {
    //Finish game
    playing = false;
    diceEl.classList.add("hidden");

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  } else {
    // Switch to next player
    switchPlayer();
  }
});

btnNew.addEventListener("click", init);

const rules = document.querySelector(".rules");
const overlay = document.querySelector(".overlay");
const btnCloseRules = document.querySelector(".close-rules");
const btnOpenRules = document.querySelector(".show-rules");

const openRule = () => {
  rules.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeRule = () => {
  rules.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnOpenRules.addEventListener("click", openRule);
btnCloseRules.addEventListener("click", closeRule);
overlay.addEventListener("click", closeRule);

document.addEventListener("keydown", e => {
  console.log(e.key);
  if (e.key === "Escape" && !rules.classList.contains("hidden")) {
    closeRule();
  }
});
