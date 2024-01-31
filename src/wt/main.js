import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workerPath = path.join(__dirname, 'worker.js');

const createWorker = (id, data) => {
    return new Promise((resolve, reject) => {
        console.log('!!!', data);
      const worker = new Worker(workerPath, { workerData: data });
  
      worker.on('message', (result) => {
        resolve(result);
      });
  
      worker.on('error', (error) => {
        reject(error);
      });
  
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  };

const runParallelTasks = async () => {
    const numCores = os.cpus().length;
    const workers = [];
  
    // Create and run worker threads
    for (let i = 0; i < numCores; i++) {
      const data = 10 + i;
      const workerPromise = createWorker(i, data);
      workers.push(workerPromise);
    }
  
    // // Wait for all workers to finish
    const results = await Promise.allSettled(workers);
  
    // // Log the results
    const formattedResults = results.map((result) => ({
      status: result.status === 'fulfilled' ? 'resolved' : 'error',
      data: result.status === 'fulfilled' ? result.value.data : null,
    }));
  
    console.log(formattedResults);
  };

const performCalculations = async () => {
    // Write your code here
    if (isMainThread) {
        runParallelTasks();
      }
};

await performCalculations();