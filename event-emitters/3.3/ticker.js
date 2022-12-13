/**  
Modify the function created in 3.2 so that it emits tick event 
immediately after the fucntion is invoked
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