const fs = require('fs');
const { searchInTargetFile } = require('./searchInTargetFile');
const { getSnpsToSearch } = require('./getSnpsToSearch');

const { extendedMode } = process.env;
const outputFile = process.env.outputFilePath || './output.csv';

(async () => {
  console.time('execution time');
  const [rowsToSearch, fileObj, header] = await getSnpsToSearch();
  const outputWriter = fs.createWriteStream(outputFile);
  outputWriter.write(`${header}${extendedMode ? ',Line index in target file,Row in target file' : ''}`);
  const foundSnps = await searchInTargetFile(rowsToSearch);
  const resultObj = { ...fileObj, ...foundSnps };
  for (const key in resultObj) {
    const value = resultObj[key];
    let line = `\n${value.row},${value.represented}`;
    if (extendedMode) {
      line += `${value.foundIndex ? ',' + value.foundIndex : ''}`;
      line += `${value.foundRow ? ',"' + value.foundRow + '"' : ''}`;
    }
    outputWriter.write(line);
  }
  console.info(`Done! Results saved in ${outputFile}`);
  console.timeEnd('execution time');
})();
