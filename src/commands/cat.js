import { createReadStream } from 'fs';
import { resolve, extname } from 'path';
import logInvalidInput from '../loggers/logInvalidInput.js';
import logOperationFailed from '../loggers/logOperationFailed.js';
import isExists from '../functions/isExists.js';
import { Transform, pipeline } from 'stream';

const cat = async (path) => {
  const workingDir = process.cwd();
  if (!path) {
    logInvalidInput();
    return;
  }
  try {
    const filePath = resolve(workingDir, path);
    const _isExists = await isExists(filePath);
    if (_isExists && extname(filePath)) {
      const write = process.stdout;
      const transform = new Transform({
        transform(chunk, encoding, callback) {
          const handledString = chunk.toString().trim();
          callback(null, handledString + '\n');
        }
      });
      const readStream = createReadStream(filePath, 'utf-8');
      pipeline(readStream, transform, write, logOperationFailed);
    } else {
      logOperationFailed();
    }
  } catch {
    logOperationFailed();
  }
}

export default cat;