'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

const init = function () {
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// roll a dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    // 2. display the dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // 3. if dice = 1, switch player; if dic != 1, add to current
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch another player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to the score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. if the score >= 100, active player win
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // else: switch the user
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// // get elements
// const score0El = document.querySelector('#score--0');
// const score1El = document.getElementById('score--1');
// const diceEl = document.querySelector('.dice');
// const btnNew = document.querySelector('.btn--new');
// const btnRoll = document.querySelector('.btn--roll');
// const btnHold = document.querySelector('.btn--hold');
// const player0El = document.querySelector('.player--0');
// const player1El = document.querySelector('.player--1');
// const currentScore0El = document.getElementById('current--0');
// const currentScore1El = document.getElementById('current--1');

// // initialize conditions
// let playerActive, totalScore, currentScore, playing, targetScore;
// const init = function () {
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   diceEl.classList.add('hidden');
//   player0El.classList.remove('player--winner');
//   player1El.classList.remove('player--winner');
//   player0El.classList.add('player--active');
//   player1El.classList.remove('player--active');

//   playerActive = 0;
//   totalScore = [0, 0];
//   currentScore = 0;
//   playing = true;
//   currentScore0El.textContent = 0;
//   currentScore1El.textContent = 0;
//   targetScore = 100;
// };

// // initilize
// init();

// const switchPlayer = function () {
//   document.getElementById(`current--${playerActive}`).textContent = 0;
//   playerActive = playerActive === 0 ? 1 : 0;
//   currentScore = 0;
//   player0El.classList.toggle('player--active');
//   player1El.classList.toggle('player--active');
// };

// const setTargetScore = function () {
//   targetScore = prompt('Enter the target score: from 20 to 200');
//   if (!targetScore >= 20 || !targetScore <= 200) {
//     alert('Out of range, the target score is set to 100 as default');
//     targetScore = 100;
//   }
// };

// setTargetScore();
// 10;

// // roll a dice
// btnRoll.addEventListener('click', function () {
//   if (playing) {
//     // generate a random dice
//     const dice = Math.trunc(Math.random() * 6) + 1;

//     // display the dice
//     diceEl.classList.remove('hidden');
//     diceEl.src = `dice-${dice}.png`;

//     // if dice != 1, add to the current score
//     if (dice !== 1) {
//       currentScore += dice;
//       document.getElementById(`current--${playerActive}`).textContent =
//         currentScore;
//     } else {
//       // dice = 1, switch player
//       switchPlayer();
//     }
//   }
// });

// // hold a score
// btnHold.addEventListener('click', function () {
//   if (playing) {
//     //1. Add current to the active player's score
//     diceEl.classList.add('hidden');
//     totalScore[playerActive] += currentScore;
//     document.getElementById(`score--${playerActive}`).textContent =
//       totalScore[playerActive];

//     //2. check if score >= target score
//     // finish the game
//     if (totalScore[playerActive] >= targetScore) {
//       playing = false;
//       diceEl.classList.add('hidden');
//       document
//         .querySelector(`.player--${playerActive}`)
//         .classList.add('player--winner');
//       document
//         .querySelector(`.player--${playerActive}`)
//         .classList.remove('hidden');
//     } else {
//       // switch to another player
//       switchPlayer();
//     }
//   }
// });

// // restart the game
// btnNew.addEventListener('click', init);
