const { readExcelFile, writeRequirement } = require('./lib/util');

function processExcelFile(filePath) {
  const data = readExcelFile(filePath);

  data.forEach((row) => {
    const { ID, Category, Title } = row;
    writeRequirement(ID, Category, Title);
  });
}

const filePath = 'requirements.xlsx';
processExcelFile(filePath);