import { fileURLToPath } from 'url';
import fs from 'fs';
import zlib from 'zlib'
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const targetFilePath = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {
    // Write your code here 
    try {
        const input = fs.createReadStream(sourceFilePath);
        const output = fs.createWriteStream(targetFilePath);
        const gzip = zlib.createGzip();

        input.pipe(gzip).pipe(output);

        output.on('finish', () => {
            console.log('File compressed successfully.');
        });

        output.on('error', (err) => {
            console.error('Error compressing file:', err);
        });
    }
    catch(error) {
        console.error(error.message);
    }
};

await compress();