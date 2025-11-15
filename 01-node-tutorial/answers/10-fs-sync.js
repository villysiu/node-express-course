const { readFileSync, writeFileSync } = require('fs')


const firstLine = "This is the first line"
const secondLine = "this is the second line"
const thirdLine = "this is the third line"

writeFileSync(
  './temporary/fileA.txt',
  `${firstLine}, ${secondLine}, ${thirdLine}`,
  { flag: 'a' }
)


const tempContent = readFileSync('./temporary/fileA.txt', 'utf8')
console.log(tempContent);

