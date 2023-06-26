import * as fs from 'fs/promises';
import { resolve } from 'path';
import logInvalidInput from '../loggers/logInvalidInput.js';
import logOperationFailed from '../loggers/logOperationFailed.js';

const rm = async (path, isMoving) => {
  const workingDir = process.cwd();
  if (!path) {
    logInvalidInput();
    return;
  }
  try {
    const pathToFile = resolve(workingDir, path);
    await fs.rm(pathToFile);
    if (!isMoving) {
      console.log(`File ${path} has been deleted`);
    }
  } catch {
    logOperationFailed();
  }
}

export default rm;
