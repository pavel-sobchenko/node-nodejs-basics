import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceFilePath = path.join(__dirname, 'files', 'fileToRemove.txt');

const remove = async () => {
    try {
        if(!fs.existsSync(sourceFilePath)) {
            throw new Error('FS operation failed: Source file does not exist');
        }
        fs.unlinkSync(sourceFilePath);
        console.log('File removed successfully');
    } catch (error) {
        console.error(error.message);
    }
};

await remove();