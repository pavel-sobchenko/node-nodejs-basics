import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFilePath = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    try {
        if(!fs.existsSync(sourceFilePath)) {
            throw new Error('FS operation failed: Source file does not exist');
        }
        const fileContent = fs.readFileSync(sourceFilePath, 'utf-8');
        console.log('File content:');
        console.log(fileContent);
    } catch (error) {
        console.error(error.message);
    }
};

await read();