import { spawn } from "child_process";
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFilePath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    // Write your code here
    return new Promise((resolve, reject) => {
        const child = spawn(sourceFilePath, args, { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });
    
        process.stdin.on('data', (data) => {
          child.stdin.write(data);
        });
    
        child.stdout.on('data', (data) => {
          process.stdout.write(data);
        });
    
        child.on('message', (message) => {e
          resolve(message);
        });
    
        child.on('error', (error) => {
          reject(error);
        });
    
        child.on('close', (code) => {
          if (code === 0) {
            resolve(code);
          } else {
            reject(code);
          }
        });
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess( ["someArgument1", "someArgument2"])
.then((result) => {
    console.log('Process completed successfully');
    console.log('Exit code:', result);
  })
.catch((error) => {
    console.error('Error during process execution');
    console.error('Exit code:', error);
  });
