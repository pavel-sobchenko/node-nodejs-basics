// n should be received from main thread
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const calculateResult = n => n*2;

const inputData = workerData;

const sendResult = () => {

    console.log('####', inputData);

    if (isMainThread) {
        console.log('1')
        const worker = new Worker(__filename, {
          workerData,
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
        try {
            const result = calculateResult(inputData);
            parentPort.postMessage({ status: 'resolved', data: result });
          } catch (error) {
            parentPort.postMessage({ status: 'error', data: null });
          }

      }
};

sendResult();