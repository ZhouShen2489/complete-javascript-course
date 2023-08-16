// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const getKeivin = function () {
  const temperature = {
    value: prompt('What is the temperatur in C: '),
  };
  debugger;
  const keivin = Number(temperature.value) + 273;

  return keivin;
};

<<<<<<< HEAD
console.log(calcAge(1990));

console.log('Bad');
||||||| c2aac23
console.log(calcAge(1990));
=======
const keivinValue = getKeivin();
console.log(keivinValue);
>>>>>>> 61ced4c9a379380677a389885b1bef7659764c2f
