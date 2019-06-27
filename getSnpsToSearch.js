const fs = require('fs');
const split = require('split');

async function getSnpsToSearch() {
  const fileObj = {};
  const snpsRow = [];
  let cursorIndex = 0;
  let header = '';
  const snpsOfInterestPath = process.env.snpsFilePath || './CSV-files/snps-of-interest.csv';
  await new Promise(resolve => {
    fs.createReadStream(snpsOfInterestPath, {
      encoding: 'utf-8'
    })
      .pipe(split())
      .on('data', row => {
        if (row) {
          const cells = row.split(',');
          const targetCell = cells[1];
          if (targetCell && /\d/.test(targetCell)) {
            snpsRow.push(row);
            fileObj[cursorIndex] = { row, represented: false };
            cursorIndex += 1;
          }
          if (cursorIndex === 0) {
            header = row;
          }
        }
      })
      .on('end', () => resolve());
  });
  return [snpsRow, fileObj, header];
}
module.exports = {
  getSnpsToSearch
};
