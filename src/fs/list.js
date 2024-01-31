import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceFolderPath = path.join(__dirname, 'files');


const list = async () => {
    try {
        if(!fs.existsSync(sourceFolderPath)) {
            throw new Error('FS operation failed: Source folder does not exist');
        }

        const files = fs.readdirSync(sourceFolderPath);
        console.log('Filenames in the "files" folder:');
        files.forEach(file => {
            console.log(file);
        });
    } catch (error) {
        console.error(error.message);
    }
};

await list();