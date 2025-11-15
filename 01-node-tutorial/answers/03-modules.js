
// import values and named the values names.
const names = require('./04-names')

// import function and named it sayHi.
const sayHi = require('./05-utils')

// import values and named the values data.
const data = require('./06-alternative-flavor')

//anything in the mainline code of the loaded module runs
require('./07-mind-grenade')


sayHi(names.john); // Hello there john
sayHi(names.peter); //Hello there peter
sayHi(names.secret); // Hello there undefined
sayHi('susan'); // Hello there susan

sayHi(data.singlePerson.name); // Hello there bob
sayHi(data.items[0]); // Hello there item1
sayHi(data.items[1]); // Hello there item2

