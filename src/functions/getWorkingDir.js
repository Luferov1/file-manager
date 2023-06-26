import { homedir } from 'os';

const getWorkingDir = () => {
  return homedir();
}

export default getWorkingDir;