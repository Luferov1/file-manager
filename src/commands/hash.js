import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import logInvalidInput from '../loggers/logInvalidInput.js';
import { resolve } from 'path';
import logOperationFailed from '../loggers/logOperationFailed.js';

const hash = async (path) => {
  if (!path) {
    logInvalidInput();
    return;
  }

  try {
    const workingDir = process.cwd();
    const pathToFile = resolve(workingDir, path);
    const text = await readFile(pathToFile, { encoding: 'utf-8' });
    console.log(createHash('sha3-256').update(text).digest('hex'));
  } catch {
    logOperationFailed();
  }
}

export default hash;