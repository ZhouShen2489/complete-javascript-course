// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    // value: Number(prompt('Degrees celsius: ')),
    value: 10,
  };

  // console.log(measurement);
  // console.table(measurement);
  // console.log(measurement.value);
  // console.warn(measurement.value);
  // console.error(measurement.value);

  const kelvin = measurement.value + 273;
  return kelvin;
};

console.log(measureKelvin());

//Challenge

const printForecast = function (arr) {
  let finalSentence = '';
  for (let i = 0; i < arr.length; i++) {
    finalSentence += `...${arr[i]}℃ in ${i + 1} days `;
  }
  return (finalSentence += '...');
};

const arr1 = [17, 21, 23];
const arr2 = [12, 5, -5, 0, 4];
console.log(printForecast(arr1));
console.log(printForecast(arr2));
