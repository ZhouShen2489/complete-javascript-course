'use strict';

// get elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

// initialize conditions
let playerActive, totalScore, currentScore, playing;
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  playerActive = 0;
  totalScore = [0, 0];
  currentScore = 0;
  playing = true;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
};

// initilize
init();

const switchPlayer = function () {
  document.getElementById(`current--${playerActive}`).textContent = 0;
  playerActive = playerActive === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// roll a dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // if dice != 1, add to the current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${playerActive}`).textContent =
        currentScore;
    } else {
      // dice = 1, switch player
      switchPlayer();
    }
  }
});

// hold a score
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current to the active player's score
    totalScore[playerActive] += currentScore;
    document.getElementById(`score--${playerActive}`).textContent =
      totalScore[playerActive];

    //2. check if score >= 100
    // finish the game
    if (totalScore[playerActive] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${playerActive}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${playerActive}`)
        .classList.remove('hidden');
    } else {
      // switch to another player
      switchPlayer();
    }
  }
});

// restart the game
btnNew.addEventListener('click', init);
