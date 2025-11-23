const { writeFile, readFile } = require("fs").promises;  

const firstLine = "This is the first line from writeWithPromisesThen.js";
const secondLine = "This is the second line.";
const thirdLine = "This is the third line.";


writeFile('./temporary/temp.txt', `${firstLine} `, { flag: 'a' })
.then(() => {  
    return writeFile('./temporary/temp.txt', `${secondLine} `, { flag: 'a' } ) 
 }) 
 // write the third line, and follow that with two more .then blocks,  
 // one to call readFile to read it back out, and one to log the data to the screen.   
 .then( () => {  
    return writeFile('./temporary/temp.txt', `${thirdLine}\n`, { flag: 'a' })

 })   
 .then(()=> {
    return readFile('./temporary/temp.txt', 'utf8');
 })
 .then((data) => {  
    console.log(data);  
 })
 .catch((error) => {  
     console.log("An error occurred: ", error)  
 })  