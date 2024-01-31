import { Transform } from "stream";

const transform = async () => {
    // Write your code here 
    try {
        const transformStream = new Transform({
            transform(chunk, encoding, callback) {
                const reversedText = chunk.toString().split('').reverse().join('');
                this.push(reversedText);
                callback();
            }
          });
          
          process.stdin.pipe(transformStream).pipe(process.stdout);
    } 
    catch (error) {
        console.error(error.message);
    }
};

await transform();