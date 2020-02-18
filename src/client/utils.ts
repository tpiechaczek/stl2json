import chalk from 'chalk';

const chalkLog = (color: 'red' | 'green', message: string) => console.log(chalk[color](message));

const log = (message: string) => console.log(message);

const logger = {
  green: (message: string) => chalkLog('green', message),
  red: (message: string) => chalkLog('red', message),
  log,
};

export { logger };
