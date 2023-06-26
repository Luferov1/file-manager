import logInvalidInput from '../loggers/logInvalidInput.js';
import { extname, resolve } from 'path';
import isExists from '../functions/isExists.js';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import logOperationFailed from '../loggers/logOperationFailed.js';

const decompress = async (params) => {
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
  const fileName = pathToFile.slice(0, -3);
  const pathToDestination = resolve(workingDir, paramsArr[0], `${fileName}`);
  const _isExists = await isExists(pathToFile);

  if (_isExists && extname(pathToFile)) {
    try {
      const readStream = createReadStream(pathToFile);
      const writeStream = createWriteStream(pathToDestination);
      const compressedStream = createBrotliDecompress();
      pipeline(
        readStream,
        compressedStream,
        writeStream,
        (e) => e && logOperationFailed()
      );
      console.log('File has been decompressed');
    } catch {
      logOperationFailed();
    }
  } else {
    logInvalidInput();
  }
}

export default decompress;
