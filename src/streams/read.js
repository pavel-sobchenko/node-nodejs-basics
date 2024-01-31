import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFilePath = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    // Write your code here 
    try {
        const fileStream = fs.createReadStream(sourceFilePath);

        fileStream.on('error', (error) => {
            console.error(`Error reading file: ${error.message}`);
          });

        fileStream.pipe(process.stdout);  
    }
    catch (error) {
        console.error(error.message);
    }
};

await read();