'use strict';

// const Person = function (firstName, birthDay) {
//   // instance properties
//   console.log(this);
//   this.firstName = firstName;
//   this.birthDay = birthDay;

//   // Never do this
//   // this.calcAge = function() {
//   //     console.log(2037 - this.birthDay);
//   // }
// };

// const zhou = new Person('zhou', 1996);
// console.log(zhou);

// // 1. new {} is created
// // 2. function is called, this = {}
// // 3. {} linked to prototype   __proto__
// // 4. function automatically return {}
// console.log(zhou instanceof Person);

// // Prototypes
// // each object that was created by the constructor function inherit methods from prototype
// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthDay);
// };

// zhou.calcAge();

// console.log(zhou.__proto__);
// console.log(zhou.__proto__ === Person.prototype); // true
// console.log(Person.prototype.isPrototypeOf(zhou)); // true
// // Prototype of Person is not person's prototype
// console.log(Person.prototype.isPrototypeOf(Person)); // false
// // prototype of linked Object

// Person.prototype.species = 'human';
// console.log(zhou.species);
// console.log(zhou.hasOwnProperty('firstName')); // true
// console.log(zhou.hasOwnProperty('species')); // false
// console.log(zhou);

// console.log(zhou.__proto__);
// // object's prototype (on top of the prototype)
// console.log(zhou.__proto__.__proto__);
// console.log(zhou.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

// const arr = [3, 4, 5, 6, 6, 6, 9]; // new Array
// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__.__proto__);

// // all array will inherit this method
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());
// const h1 = document.querySelector('h1');
// console.dir(h1);
// console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const car1 = new Car('BMW', 120);
// const car2 = new Car('Mercedes', 95);

// car1.accelerate();
// car1.accelerate();
// car1.brake();

// car2.accelerate();
// car2.brake();

// ES6
// class declaration
// class is a special function behind scene
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}

// const zhouShen = new PersonCl('zhou shen', 1996);
// zhouShen.calcAge();
// console.log(zhouShen.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this._fullName}`);
// };

// zhouShen.greet();
// zhouShen.fullName = 'Zhou';
// console.log(zhouShen.fullName);

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

// Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  },
};

// const steven = Object.create(PersonProto);
// steven.init('steven', 2003);
// steven.calcAge();

// console.log(steven.__proto__ === PersonProto);

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} going at ${this.speed} km/h`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} going at ${this.speed} km/h`);
//   }

//   get speedUs() {
//     return `${this.speed / 1.6} mi/h`;
//   }

//   set speedUs(speed) {
//     this.speed = speed * 1.6;
//     console.log(`Current speed is ${this.speed} km/h`);
//   }
// }

// const car1 = new CarCl('Ford', 120);
// car1.accelerate();
// car1.brake();
// console.log(car1.speedUs);
// car1.speedUs = 150;

// const Person = function (firstName, birthDay) {
//   console.log(this);
//   this.firstName = firstName;
//   this.birthDay = birthDay;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthDay);
// };

// const Student = function (firstName, birthDay, course) {
//   Person.call(this, firstName, birthDay); // this refers to the {} of the object
//   this.course = course;
// };

// // linking prototype, should be first of any other prototypes
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const david = new Student('david', 1996, 'CS');
// david.introduce();
// david.calcAge();

// // Now david's prototye is linked to person. To resolve it, set the constructor here
// Student.prototype.constructor = Student;

// console.log(david.__proto__);
// console.log(david.__proto__.__proto__);

// console.log(david instanceof Student);
// console.log(david instanceof Person);

// console.dir(Student.prototype.constructor); // Now Student's prototype constructor is Student itself

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed} km/h`);
};
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype); // link the prototype

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 40, 50);
EV.prototype.constructor = EV;
tesla.brake();
tesla.chargeBattery(80);
tesla.accelerate();

// Inheritance between 'classes'
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // override
  calcAge() {
    console.log(2037 - this.birthYear + 10);
  }
}

const zhouCan = new StudentCl('Zhou Can', 2008, 'cs');
zhouCan.introduce();
zhouCan.calcAge();

// inheritance between Object.create()
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (fullName, birthYear, course) {
  PersonProto.init.call(this, fullName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.fullName} and I study ${this.course}`);
};
const ken = Object.create(StudentProto);
ken.init('Ken Sedney', 2010, 'CS');
ken.introduce();
ken.calcAge();
