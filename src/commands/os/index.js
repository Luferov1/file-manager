import OSArguments from './osArguments.js';
import { EOL, cpus, homedir, userInfo, arch } from 'os';
import logInvalidInput from '../../loggers/logInvalidInput.js';

const os = (argument) => {
  switch (argument) {
    case OSArguments.EOL:
      console.log(JSON.stringify(EOL));
      break;

    case OSArguments.CPUS:
      const cpusInfo = cpus();
      console.log(`There are ${cpusInfo.length} CPUs`);
      cpusInfo.forEach(( { model } ) => console.log(model));
      break;

    case OSArguments.HOMEDIR:
      console.log(homedir());
      break;

    case OSArguments.USERNAME:
      console.log(userInfo().username);
      break

    case OSArguments.ARCHITECTURE:
      console.log(arch());
      break;

    default:
      logInvalidInput();
  }
}

export default os;