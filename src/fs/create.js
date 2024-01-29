import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'fresh.txt');

const msg = 'I am fresh and young';
const create = async () => {
    try {
        if (fs.existsSync(filePath)) {
          throw new Error('FS operation failed: File already exists');
        }
    
        fs.writeFile(filePath, msg, (err) => {
          if (err) throw err;
        });
    
        console.log('File created successfully: fresh.txt');
      } catch (error) {
        console.error(error.message);
      }
};

await create();

