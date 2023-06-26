import { createReadStream } from 'fs';
import { resolve, extname } from 'path';
import logInvalidInput from '../loggers/logInvalidInput.js';
import logOperationFailed from '../loggers/logOperationFailed.js';
import isExists from '../functions/isExists.js';

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
      const readStream = createReadStream(filePath, 'utf-8');
      readStream.on('data', (data) => console.log(data));
    } else {
      logOperationFailed();
    }
  } catch {
    logOperationFailed();
  }
}

export default cat;