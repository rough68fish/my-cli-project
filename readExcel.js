const { readExcelFile } = require('./lib/util');

const filePath = 'requirements.xlsx';

data = readExcelFile(filePath);

data.forEach((row) => {
    console.log(row);
});
