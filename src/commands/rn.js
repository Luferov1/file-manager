import { rename } from 'fs/promises';
import { resolve } from 'path';
import isExists from '../functions/isExists.js';
import logInvalidInput from '../loggers/logInvalidInput.js';
import logOperationFailed from '../loggers/logOperationFailed.js';

const rn = async (params) => {
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
  const newFileName = resolve(workingDir, paramsArr[1]);
  const _isExists = await isExists(newFileName);

  if (_isExists) {
    logOperationFailed();
    return;
  }


  try {
    await rename(pathToFile, newFileName);
    console.log(`Name of ${paramsArr[0]} has been changed to ${paramsArr[1]}`);
  } catch {
    logOperationFailed();
  }
}

export default rn;