const { readExcelFile, writeRequirement } = require('./lib/util');

function processExcelFile(filePath) {
  const data = readExcelFile(filePath);

  data.forEach((row) => {
    const { ID, Category, Title, Description } = row;
    writeRequirement(ID, Category, Title, Description);
  });
}

const filePath = 'requirements.xlsx';
processExcelFile(filePath);