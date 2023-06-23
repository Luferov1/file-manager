const up = () => {
  const currentPath = process.cwd();
  const pathArr = currentPath.split('\\').slice(0, -1);
  if (pathArr.length > 1) {
    process.chdir(currentPath.split('\\').slice(0, -1).join('\\'));
  } else {
    process.chdir(`${pathArr[0]}\\`);
  }
}

export default up;