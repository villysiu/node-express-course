const EventEmitter = require("events");  
const emitter = new EventEmitter();  
let number = 10;
console.log("Starting countdown...");
setInterval(() => {  
  emitter.emit("timer", number--);  
//   number-
    if (number === 0) {
        console.log("Bye")
        process.exit();
    }   
}, 1000);  
emitter.on("timer", (msg) => console.log(msg));  
