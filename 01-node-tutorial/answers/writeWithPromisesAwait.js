const { writeFile, readFile } = require("fs").promises;  

const firstLine = "This is the first line from writeWithPromisesAwait.js";
const secondLine = "This is the second line.";
const thirdLine = "This is the third line.";

const writer = async () => {
    try {
       await writeFile(
        './temporary/temp.txt',
        `${firstLine} ${secondLine}, ${thirdLine}\n`,
        { flag: 'a' }
        );
    } catch (err) {
        console.log("An error occurred: ", err)
    }
};

const reader = async () => {
    try {
        const data = await readFile('./temporary/temp.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.log("An error occurred: ", err)
    }
};

const readWrite = async () => {
    await writer();
    await reader();
}

readWrite();