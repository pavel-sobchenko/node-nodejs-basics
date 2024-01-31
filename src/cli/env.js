import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFilePath = path.join(__dirname,  '.env');

const getRootPath = () => {
    let currentPath = __dirname;
  
    // Navigate up until reaching the root directory
    while (!fs.existsSync(path.join(currentPath, '.env'))) {
      currentPath = path.dirname(currentPath);
  
      // Check if we have reached the root
      if (currentPath === path.dirname(currentPath)) {
        throw new Error('Unable to find the root directory.');
      }
    }
  
    console.log(currentPath);
    return currentPath;
  }

const parseEnv = () => {
    try {
        const prefix = "RSS_";
        const envFilePath = path.join(getRootPath(), '.env');
        const envFileContent = fs.readFileSync(envFilePath, 'utf8');

        const envVariables = envFileContent.split('\n').filter(line => line.trim() !== '');

        envVariables.forEach(variable => {
            const [key, value] = variable.split('=');
            process.env[key] = value;
        });

        const allVariables = process.env;
        const filteredVariables = Object.keys(allVariables)
        .filter((key) => key.startsWith(prefix))
        .reduce((obj, key) => {
            obj[key] = allVariables[key];
            return obj;
        }, {});

        const formattedVariables = Object.entries(filteredVariables)
            .map(([key, value]) => `${key}=${value}`)
            .join("; ");

        console.log(`Environment variables with prefix "${prefix}":`);    
        console.log(formattedVariables);    

    }  catch (err) {
        console.log(err);
    }
};

parseEnv();