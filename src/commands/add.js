import logInvalidInput from '../loggers/logInvalidInput.js';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import logOperationFailed from '../loggers/logOperationFailed.js';

const add = async (fileName) => {
  const workingDir = process.cwd();
  const filePath = resolve(workingDir, fileName);
  if (!fileName) {
    logInvalidInput();
    return;
  }
  try {
    await writeFile(filePath, '', { flag: 'wx' });
    console.log(`new file ${fileName} has been created`);
  } catch {
    logOperationFailed();
  }
}

export default add;