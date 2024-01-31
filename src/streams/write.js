import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFilePath = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    // Write your code here 
    try {
        const fileStream = fs.createWriteStream(filePath);

        fileStream.on('error', (error) => {
            console.error(`Error writing to file: ${error.message}`);
        });

        process.stdin.pipe(fileStream);
    } 
    catch (error) {
        console.error(error.message);
    }
};

await write();