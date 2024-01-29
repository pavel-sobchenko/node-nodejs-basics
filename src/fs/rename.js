import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFilePath = path.join(__dirname, 'files', 'wrongFilename.txt');
const targetFilePath = path.join(__dirname, 'files', 'properFilename.md');

const rename = async () => {
    try {
        if(!fs.existsSync(sourceFilePath)) {
            throw new Error('FS operation failed: Source file does not exist');
        }

        if(fs.existsSync(targetFilePath)) {
            throw new Error('FS operation failed: Target file already exists');
        }

        fs.renameSync(sourceFilePath, targetFilePath);
        console.log('File renamed successfully');
    } 
    catch (error) {
        console.error(error.message);
    }
};

await rename();