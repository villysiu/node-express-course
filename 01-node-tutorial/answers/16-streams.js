import { createReadStream } from 'fs';
// 3:35:08 https://youtu.be/Oe421EPjeBE?t=6357
let counter = 0;
const stream = createReadStream('../content/big.txt', {
        encoding: 'utf8',
        highWaterMark: 2000  // read 200 bytes per chunk
    })

stream.on('data', (result) => {
    console.log(result);
    counter++;
    // console.log(`--- Chunk ${counter} ---`);
})
stream.on('end', () => {
    console.log(`Total chunks: ${counter}`);
})

stream.on('error', (error) => {
    console.log("An error occurred: ", error);
})






