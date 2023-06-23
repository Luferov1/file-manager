import * as readline from 'readline';
import getUsername from './functions/getUsername.js';
import COMMANDS from './commands/commandNames.js';
import getWorkingDir from './functions/getWorkingDir.js';
import logWorkingDir from './loggers/logWorkingDir.js';
import up from './commands/up.js';
import logInvalidInput from './loggers/logInvalidInput.js';
import cd from './commands/cd.js';
import ls from './commands/ls.js';
import cat from './commands/cat.js';

const input = process.stdin;
const output = process.stdout;
const username = getUsername(process.argv.slice(2));
process.chdir(getWorkingDir());

const runApp = () => {
  if (username) {
    const rl = readline.createInterface({input, output});
    console.log(`Welcome to the File Manager, ${username}!`);
    logWorkingDir(process.cwd());
    rl.on('line', async (command) => {
      switch (command.split(' ')[0]) {
        case COMMANDS.EXIT:
          rl.close();
          break;

        case COMMANDS.UP:
          up();
          break;

        case COMMANDS.CD:
          cd(command.slice(3));
          break;

        case COMMANDS.LS:
          ls();
          break;

        case COMMANDS.CAT:
          await cat(command.slice(4));
          break;

        default:
          logInvalidInput();
      }
      logWorkingDir();
    });
    rl.on('close', () => {
      return console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    });
  } else {
    logInvalidInput()
  }
}

runApp();