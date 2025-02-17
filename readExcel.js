const { readExcelFile } = require('./dist/util');

const filePath = 'requirements.xlsx';

data = readExcelFile(filePath);

data.forEach((row) => {
    console.log(row);
});
