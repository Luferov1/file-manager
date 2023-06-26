import { createReadStream, createWriteStream } from 'fs';
import logInvalidInput from '../loggers/logInvalidInput.js';
import { extname, resolve } from 'path';
import isExists from '../functions/isExists.js';
import logOperationFailed from '../loggers/logOperationFailed.js';

const cp = async (params, isDeleting) => {
  if (!params) {
    logInvalidInput();
    return;
  }

  const workingDir = process.cwd();
  const paramsArr = params.split(' ');

  if (!paramsArr[0] || !paramsArr[1]) {
    logInvalidInput();
    return;
  }

  const pathToFile = resolve(workingDir, paramsArr[0]);
  const pathToNewDirectory = resolve(workingDir, paramsArr[1], paramsArr[0]);
  const _isExists = await isExists(pathToFile);


  if (_isExists && extname(pathToFile)) {
    try {
      const readStream = createReadStream(pathToFile);
      const writeStream = createWriteStream(pathToNewDirectory);
      readStream.pipe(writeStream);
      if (isDeleting) {
        console.log(`File ${paramsArr[0]} has been moved to ${pathToNewDirectory}`);
      } else {
        console.log(`File ${paramsArr[0]} has been copied to ${pathToNewDirectory}`);
      }
    } catch {
      logOperationFailed();
    }
  } else {
    logInvalidInput();
  }
}

export default cp;