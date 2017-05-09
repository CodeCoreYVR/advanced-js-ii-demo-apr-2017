





// Arrow function
/*
const bark = function (name, sound = "Woof!") {

}
*/ // 👇 is nearly equivalent to 👆
/*
const bark = (name, sound = "Woof!") => {
  return `${name} barks ${sound}`;
}
*/
// is used like a regular function
// bark('Moneybags Michael', 'Moooo Mooney!');

// If a arrow function's body only returns one expression,
// we can simplify to this form
// - the {} for the function block are no longer needed
// - the single expression is returned eliminating the need to
//   use the `return` keyword
/*s
const bark = (name, sound = "Woof!") => `${name} barks ${sound}`;
*/

// If an arrow function only has one argument and that arguments
// doesn't have a default value, we can omit the () around its arguments
const bark = name => `${name} barks Woof!`;


// EXERCISE: toArrowFunction

/*
function add (a, b) {
  return a + b;
}
*/

let add = (a, b) => a + b;

/*
function notNull (obj) {
  return obj !== null;
}
*/

const notNull = obj => obj !== null;

/*
function flip (fn) {
  return function (a, b) {
    return fn(b, a);
  }
}
*/
/*
const flip = fn => {
  return (a, b) => {
    return fn(b, a);
  }
}
*/

const flip = fn => (a, b) => fn(b, a);

// usage:
const flippedAdd = flip(add);

const sub = (a, b) => a - b;
const flippedSub = flip(sub);

sub(10, 5) // returns 5
flippedSub(10, 5) // returns -5

// Arrow functions' this is scoped to the function block it was
// created in
const doggo = {
  name: 'Moneybags Michael',
  bark () { // bark is a method of doggo
  // sayWho is a function declared inside bark
	const sayWho = function () { // create as regular function
      console.log('Is the object:', this);
    } // this logged is Window object
    sayWho();
    return `${this.name} barked`
  }
}

const doggoWithArrow = {
  name: 'Moneybags Michael',
  bark () { // bark is a method of doggoWithArrow
  // sayWho is a function declared inside bark
	const sayWho =  () => { // created as arrow function
      console.log('Is the object:', this);
    } // this logged is doggoWithArrow object
    sayWho();
    return `${this.name} barked`
  }
}

// DEMO A Loud function &
// EXERCISE How should I scream?

let add3 = (a, b, c) => a + b + c;

// you can't use any keyword including `function` as variables
// or arguments
function loud (logFn, fn, ...args) {
  // (...argName) is the GATHER operator when used as above
  // it will put all remaining arguments into array of argName
  // (i.e. args == [10, 9] when calling loud(add, 10, 9))
  // fn is a callback function
  logFn(`Calling ${fn.name} with`, args);
  const returnValue = fn(...args);
  // (fn(...arrayName)) is the SPREAD operator when used as above
  // it will pass all elements of `arrayName` as arguments to
  // `fn`.
  // (i.e. add3(...[10, 9, 11]) -> add3(10, 9, 11))
  logFn(`Called ${fn.name} & returned ${returnValue}`);
  return returnValue;
}

// DEMO: Implement each

// without index
/*
function each (fn, arr) {
  for (let val of arr) {
    fn(val);
  }
}
*/

// with index
function each (fn, arr) {
  for (let i = 0, max = arr.length; i < max; i += 1) {
    fn(arr[i], i);
  }
}

//usage:
// logs every value and index of [1,2,3,4,5]
// each((val, index) => console.log(val, index), [1,2,3,4,5]);

// EXERCISE: Implement Map

function map (fn, arr) {
  let newArr = [];
  for (let i = 0, max = arr.length; i < max; i += 1) {
    newArr.push(fn(arr[i], i));
  }
  return newArr;
}

//usage:
map(v => v ** 2, [1,2,3,4,5]);

// DEMO Timing with Intervals!

class Timer {
  constructor (startTime) {
    this.startTime = startTime;
    this.endTime = 0;
  }
  start() {
    let currentTime = this.startTime;
    console.log('Starting timer with', this.startTime);
    const intervalId = setInterval(() => {
      // this anonymous function
      // keeps access to the Closure of its parent function, start,
      // after its declared. Allowing to make use of the
      // variables currentTime & intervalId when its called
      // later by setInterval
      console.log('currentTime:', currentTime);
      currentTime -= 1;

      if (currentTime <= this.endTime) {
        clearInterval(intervalId);
        console.log('Ended timer with', this.endTime);
      }
    }, 1000);
  }
}

// Closures
// Functions keep access the function scope in which they are created
// (or, declared).

let foo = "I'm global";
let bar = function (a) {
  let foo = "I'm local";
  console.log('Inside bar:', foo, a)
  return function baz (b) {
    console.log('Inside baz:', foo, a, b);
  }
}

// DEMO What? Loud is evolving!

const loudWith = function (logFn, fn) {
  // logFn & fn are stored in the Closure of
  // loudWith for 👇
  return function (...args) {
    logFn(`Calling ${fn.name} with`, args);
    const returnValue = fn(...args);
    logFn(`Called ${fn.name} & returned ${returnValue}`);
    return returnValue;
  }
}

// usage:
const loudAdd = loudWith(console.info, add);

// DEMO Implement `once` while allows a callback
// to be called only once

const once = fn => {
  let returnValue; // returnValue will be in the close of `once`

  return (...args) => {
    if (returnValue === undefined) {
      returnValue = fn(...args);
    }
    return returnValue;
  }
}





/* */
