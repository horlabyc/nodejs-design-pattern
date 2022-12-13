/**  
Modify the function created in 3.3 so that  it produces an error if the timestamp at the moment
of a tick (including the initial one thet we added as part of exercise 3.3) is divisible by 5.
Propagate the error using both the callback and the evebt emitter. 
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
  if ( Date.now() % 5 === 0) {
    emitter.emit('error', 'Time is divisible by 5')
    return cb("Time is divisible by 5", count)
  }
  process.nextTick(() =>  emitter.emit('ticks'))
  setTimeout(() => {
    emitter.emit('ticks')
    return emitRecursion(number - 50, emitter, count + 1, cb)
  }, 50);
}

tickerFn(500, (err, count) => {
  if (err) {
    console.log(`Error occured :: ${err}`)
  }
  console.log(`Program emitted ${count} ${count > 1 ? "ticks" : "tick"}.`)
})
  .on('ticks', () => console.log("Tick emitted"))
  .on('error', (error) => console.log(error))