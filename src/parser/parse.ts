import { readFileSync, writeFileSync } from 'fs';
import { parseASCII } from './parse-ascii';
import { parseBinary } from './parse-binary';
import { logger } from '../client/utils';

type FacetType = {
  normal: number[];
  vertices: number[][];
};

const writeResult = (outputFile: string, result: FacetType[]) => {
  writeFileSync(outputFile, JSON.stringify({ result }, null, 2));
  logger.green(`Result written succesfuly :: ${outputFile} \nBye !!!`);
}

export const parse = (inputFile: string, outputFile: string) => {
  const decoder = new TextDecoder('utf-8');
  let result;
  try {
    const fileContent = readFileSync(inputFile);

    // TODO: to simplistic check
    const isASCII = decoder.decode(fileContent.slice(0, 32)).includes('solid');

    if (isASCII) {
      logger.green('Input file format: ASCII');
      result = parseASCII(fileContent);
    } else {
      logger.green('Input file format: BINARY (little endian)');
      result = parseBinary(fileContent);
    }
    writeResult(outputFile, result);
  } catch (e) {
    logger.red(e);
    return;
  }
};
