const fs = require('fs');
const split = require('split');

async function searchInTargetFile(rows) {
  const snps = rows.map(row => {
    const splittedRow = row.split(',');
    return splittedRow[1].trim();
  });
  const snpsArr = [...snps];
  const targetFile = process.env.targetFilePath || './CSV-files/ASA-24v1-0_A1.csv';
  let index = 0;
  let foundCount = 0;
  const result = {};

  await new Promise(resolve => {
    fs.createReadStream(targetFile, {
      encoding: 'utf-8'
    })
      .pipe(split())
      .on('data', row => {
        const cells = row.split(',');
        const targetCell = cells[1];
        if (targetCell && snpsArr.indexOf(targetCell) !== -1 && /\d/.test(targetCell)) {
          result[snps.indexOf(targetCell)] = {
            foundIndex: index + 1,
            foundRow: row,
            represented: true,
            row: rows[snps.indexOf(targetCell)]
          };
          foundCount += 1;
          // reduce founded snps for better performance
          snpsArr.splice(snpsArr.indexOf(targetCell), 1);
        }
        index += 1;
      })
      .on('end', () => {
        resolve();
      });
  });
  console.log(`Inspected ${index} rows and found ${foundCount} items`);
  return result;
}
module.exports = {
  searchInTargetFile
};
