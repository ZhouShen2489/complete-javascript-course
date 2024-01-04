'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 1,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
};

// mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// ({ a, b } = obj);
// console.log(a, b);

// destructing objects as argument
// arguments 不需要讲究顺序
// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// spread operator
const mainMenuCopy = [...restaurant.mainMenu];

// AND / OR
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
// console.log(guests);

// nullish coalescing operator
const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

// for of looping
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// entries
// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// }

// console.log(menu.entries());

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  printGoals: function (...names) {
    let totalScore = 0;
    for (let i = 0; i < names.length; i++) {
      console.log(names[i]);
      if (this.scored.includes(names[i])) {
        totalScore += 1;
      }
    }
    console.log(`The total score is ${totalScore}`);
  },
};

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// //1;
console.log('========Challenge 1=========');
// const players1 = Object.assign([], game.players[0]);
// const players2 = Object.assign([], game.players[1]);
const [players1, players2] = game.players;
// const players1 = [...game.players[0]];
// const players2 = [...game.players[1]];

// // 2.
const [gk, ...fieldPlayers] = players1;

// // 3.
const allPlayers = [...players1, ...players2];

// // 4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// // 5.
const { team1, x: draw, team2 } = game.odds;

// //OR nested destruction
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);
// // 6.

// game.printGoals('Lewandowski', 'Gnarby', 'Lewandowski', 'Neuer');
// game.printGoals(...game.scored);
// // 7.
const winner = (team1 < team2 && 1) || 2;
// const winner = (game.odds.team1 < game.odds.team2 && 1) || 2;
// console.log(winner);

// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/
console.log('=========Challenge2=========');
// 1.
for (const [i, name] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${name}`);
}

// console.log(game.scored.entries());
// for (const [index, name] of game.scored.entries()) {
//   console.log(`Goal ${index + 1}: ${name}`);
// }

// 2.
let sum = 0;
const odds = Object.values(game.odds);
for (const odd of odds) {
  sum += odd;
}
console.log(sum / odds.length);

// let avgOdd = 0;
// const odds = Object.values(game.odds);
// for (const odd of odds) {
//   avgOdd += odd;
// }
// console.log(avgOdd / odds.length);

// 3.
for (const [team, odd] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${game[team] ? 'victory ' : ''}${game[team] ?? 'draw'}: ${odd}`
  );
}

// for (const [team, odd] of Object.entries(game.odds)) {
//   console.log(`Odd of ${game[team] || 'draw'}: ${odd}`);
// }

// bonus
const result = {};
for (const name of game.scored) {
  result[name] ? result[name]++ : (result[name] = 1);
}
console.log(result);
// const result = {};
// for (const name of game.scored) {
//   result[name] ? result[name]++ : (result[name] = 1);
// }
// console.log(result);
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// const arr = [1, 2];
// const rest = new Map();
// rest.set(arr, 'Good');
// console.log(rest.get(arr));
// rest.set(document.querySelector('h1'), 'This is heading 1!');
// console.log(rest);

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

console.log('=========CHALLENGE 3===========');
// console.log(gameEvents);

// 1.
const events = [...new Set(gameEvents.values())];
console.log(events);

// const events = [...new Set(gameEvents.values())];
// console.log(events);

// 2.
gameEvents.delete(64);
console.log(gameEvents);

// gameEvents.delete(64);
// console.log(gameEvents.has(64));

// 3.
console.log(
  `An event happened, on average, every ${Math.trunc(
    90 / gameEvents.size
  )} minutes`
);

// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );

// const lastTime = [...gameEvents.keys()].pop();
// console.log(lastTime);

// 4.
for (const [time, event] of gameEvents) {
  console.log(`[${time <= 45 ? 'First' : 'Second'} HALF] ${time}: ${event}`);
}

// for (const [time, event] of gameEvents) {
//   if (time <= 45) {
//     console.log(`[FIRST HALF] ${time}: ${event}`);
//   } else {
//     console.log(`[SECOND HALF] ${time}: ${event}`);
//   }
// }

// string method
const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replaceAll('door', 'gate'));

const message = 'Go to gate 23!';
console.log(message.padStart(20, '++'));

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
console.log('Challeng4'.padStart(20, '+').padEnd(35, '+'));
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value.split('\n');
  for (const [i, sentence] of text.entries()) {
    const [first, second] = sentence.trim().toLowerCase().split('_');
    const newSentence = first + second[0].toUpperCase() + second.slice(1);
    console.log(newSentence.padEnd(20, ' ') + '✅'.repeat(i + 1));
  }
});

// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   const texts = text.split('\n');
//   for (const [index, eachText] of texts.entries()) {
//     const [first, second] = eachText.trim().toLowerCase().split('_');
//     const output = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;
//     console.log(output.padEnd(20, ' ') + '✅'.repeat(index + 1));
//   }
// });
