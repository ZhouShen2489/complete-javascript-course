'use strict';

// function as a return
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// arrow function
const greet2 = greeting => name => console.log(`${greeting} ${name}`);

const greeter = greet('Hello!');
console.log(typeof greeter);
greeter('Zhou');

const greeter2 = greet2('Hi!');
console.log(typeof greeter2);
greeter2('Shen');

// closure
const boarding = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We have ${n} passengers pin total and ${perGroup} groups`);
  }, wait * 1000);
  console.log(`Boarding need to wait ${wait} seconds`);
};

// const perGroup = 10;
boarding(180, 5);
// the timeout function will have access to n, wait, and perGroup even boarding is not in stack.

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
