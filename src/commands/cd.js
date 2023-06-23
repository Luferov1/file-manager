import logInvalidInput from '../loggers/logInvalidInput.js';
import { isAbsolute, join } from 'path';
import logOperationFailed from '../loggers/logOperationFailed.js';

const cd = (path) => {
  const workingDir = process.cwd();
  if (!path) {
    logInvalidInput();
    return;
  }
  try {
    if (isAbsolute(path)) {
      process.chdir(path);
    } else {
      process.chdir(join(workingDir, path));
    }
  } catch {
    logOperationFailed();
  }
}

export default cd;