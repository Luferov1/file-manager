import { readdir } from 'fs';
import logOperationFailed from '../loggers/logOperationFailed.js';

const ls = () => {
  readdir(process.cwd(), { withFileTypes: true },(err, files) => {
    if (err) logOperationFailed();
    const tableArr = [];
    files.forEach((file) => {
      const type = file.isFile() ? 'file' : 'directory';
      tableArr.push({
        Name: file.name,
        Type: type,
      });
    })
    console.table(tableArr);
  });
}

export default ls;