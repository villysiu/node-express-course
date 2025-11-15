const path = require('path')

console.log(path.sep) 

const filePath = path.join('CTD', 'assignments', 'answer.js')
console.log(filePath) // CTD/assignments/answer.js

const base = path.basename(filePath) 
console.log(base)  // answer.js

const absolute = path.resolve(__dirname, 'CTD', 'assignments', 'answer.js')
console.log(absolute) // /Users/villysiu/node-express-course/01-node-tutorial/answers/CTD/assignments/answer.js
