'use strict';

console.log(undefined || null);
if (undefined || null) {
  console.log('bad');
} else {
  console.log('good');
}
