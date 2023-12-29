"use strict";

const calcRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retire = 65 - age;
  return `${firstName} retires after ${retire} years`;
};

const retireYears = calcRetirement(1996, "Zhou");
console.log(retireYears);

bmi;
bmi;
