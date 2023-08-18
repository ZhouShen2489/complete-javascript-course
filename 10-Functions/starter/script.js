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
