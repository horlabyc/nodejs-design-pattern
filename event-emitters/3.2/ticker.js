/**  
Write a simple function that accepts a number and a callback as the arguments
The function will return an EventEmitter that emits an event called tick every 50 milliseconds
until the number of milliseconds is passed from the invocation of the function. 
The function will also call the callback when the number of milliseconds has passed, providing, as result,
the total count of tick events emitted.

Hint: you can use setTimeout() to schedule another setTimeout() recursively
*/
const { EventEmitter } = require('events');

const tickerFn = (number, cb) => {
  const emitter = new EventEmitter()
  emitRecursion(number, emitter, 0, cb)
  return emitter
}

function emitRecursion(number, emitter, count, cb) {
  if (number <= 0) {
    return cb(null, count)
  }
  setTimeout(() => {
    emitter.emit('ticks')
    return emitRecursion(number - 50, emitter, count + 1, cb)
  }, 50);
}

tickerFn(500, (err, count) => {
  console.log(`Program emitted ${count} ${count > 1 ? "ticks" : "tick"}.`)
})
  .on('ticks', () => console.log("Tick emitted"))
