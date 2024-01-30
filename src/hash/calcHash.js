import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import path from 'path';
import { TextEncoder } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    // Write your code here 
    try {
        const sourceFilePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

        const fileData = fs.createReadStream(sourceFilePath);
        const buffer = new TextEncoder().encode(fileData);

        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        
        console.log(`SHA256 Hash for ${sourceFilePath}: ${hashHex}`);
    } catch (error) {
        console.error(error.message);
    }
};

await calculateHash();