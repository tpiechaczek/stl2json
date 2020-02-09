#!/usr/bin/env node
import clear from 'clear';
import figlet from 'figlet';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

const init = () => {
  clear();

  logger.green(figlet.textSync(`svg2stl`, { horizontalLayout: 'full' }));

  if (Object.entries(args).length < 2) {
    return logger.log();
  }

  const config = {
    openPreview: false,
    root: '',
  };

  if (args.o || args.O) {
    config.openPreview = true;
  }

  if (args.r || args.R) {
    config.root = args.r || args.R;
    if (typeof config.root === 'boolean') {
      logger.red(provideRootPath);
    } else {
      render(config);
    }
  } else {
    logger.red(provideRootPath);
  }
};

init();
