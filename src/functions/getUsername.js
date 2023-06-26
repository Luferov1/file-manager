const getUsername = (args) => {
  const arg = args[0];
  if (arg) {
    if (arg.includes('--username=')) {
      return arg.replace('--username=', '');
    }
  }
  return null;
};

export default getUsername;