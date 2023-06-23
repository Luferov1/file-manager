import { access } from 'fs/promises';

const isExists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export default isExists;