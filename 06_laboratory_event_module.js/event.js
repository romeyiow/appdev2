const EventEmitter = require('events')
const emitter = new EventEmitter()

//Listener 1:
emitter.on("start", () => {
    console.log("Application Started!")
})

//Listener 2:
emitter.on("data", (data) => {
    console.log(`
Data received: 
    - name: ${data?.name || 'unknown'}
    - age: ${data?.age || 'unknown'}
    - location: ${data?.location || 'unknown'}`
    )
})

//Error handling listener:
emitter.on('error', (err) => {
    console.error(`Error occurred: ${err}`)
});

//Trigger the events:
emitter.emit('start'); //trigger the start event
emitter.emit('data', { name: "John Doe", age: 34 }) //trigger data event
emitter.emit('error', "Invalid operation!"); //emit error event