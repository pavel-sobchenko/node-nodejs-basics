import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const sourceFolderPath = path.join(__dirname, 'files');
    const targetFolderPath = path.join(__dirname, 'files_copy');
    try {
        if(!fs.existsSync(sourceFolderPath)) {
            throw new Error('FS operation failed: Source folder does not exist');
        }

        if(fs.existsSync(targetFolderPath)) {
            throw new Error('FS operation failed: Target folder already exists');
        }

        fs.mkdirSync(targetFolderPath);
        const files = fs.readdirSync(sourceFolderPath);

        files.forEach(file => {
            const sourceFilePath = path.join(sourceFolderPath, file);
            const targetFilePath = path.join(targetFolderPath, file);
            fs.copyFileSync(sourceFilePath, targetFilePath);
        });
        console.log('Files copied successfully');
    } 
    catch (error) {
        console.error(error.message);
    }
};

await copy();
