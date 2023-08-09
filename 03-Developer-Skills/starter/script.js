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

const keivinValue = getKeivin();
console.log(keivinValue);
