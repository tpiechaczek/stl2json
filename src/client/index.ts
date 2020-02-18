#!/usr/bin/env node
import clear from 'clear';
import figlet from 'figlet';
import minimist from 'minimist';

import { parse } from '../parser';
import { logger } from './utils';

const args = minimist(process.argv.slice(2));

const init = () => {
  clear();
  let outputFile;

  logger.green(figlet.textSync(`stl2json`, { horizontalLayout: 'full' }));

  if (Object.entries(args).length < 1) {
    return logger.log('Please specify the input file.');
  }

  const inputFile = args.f || args.F;
  if (inputFile && typeof inputFile !== 'boolean') {
    logger.green(`Input: ${inputFile}`);
  } else {
    logger.red(`
      Input file not specified.
      To specify the file, please use '-f' flag with file path.
      Exiting!`
    );
    return;
  }

  const output = args.o || args.O;
  if (output && typeof output !== 'boolean') {
    outputFile = args.o || args.O;
    logger.green(`Output: ${outputFile}.`);
  } else {
    outputFile = `${inputFile}.json`;
    logger.green(`Output file not specified. '${outputFile}' will be used as an output path.`);
  }

  parse(inputFile, outputFile);
};

init();
