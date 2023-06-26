const logWorkingDir = () => {
  const dir = process.cwd();
  console.log(`You are currently in ${dir}`);
}

export default logWorkingDir;