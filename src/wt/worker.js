// n should be received from main thread
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {

    if (isMainThread) {
        const worker = new Worker(__filename, {
          workerData: { n: 10 },
        });
      
        worker.on('message', (result) => {
          console.log(`Result from worker: ${result}`);
        });
      
        worker.on('error', (error) => {
          console.error(`Error in worker: ${error}`);
        });
      
        worker.on('exit', (code) => {
          console.log(`Worker exited with code ${code}`);
        });
      } else {
        const { n } = workerData;
      
        const result = nthFibonacci(n);
      
        parentPort.postMessage(result);

      }
};

sendResult();