const fs = require('fs');

function writeRequirement(reqmntID, reqmntCat, reqmntTitle, description) {
    const formattedDescription = description.replace(/\r\n/g, '<br>');
    const content = `# Requirement ${reqmntID}

| ID   | Category   | Title       |
|------|------------|-------------|
| ${reqmntID} | ${reqmntCat} | ${reqmntTitle} |

| Description |
| ----- |
| ${formattedDescription} |

`;

    fs.writeFileSync(`Req${reqmntID}.md`, content, 'utf8');
}

function readRequirement(reqmntID) {
    const content = fs.readFileSync(`Req${reqmntID}.md`, 'utf8');
    const lines = content.split('\n');
  
    let id, category, title, description;
  
    lines.forEach((line, index) => {
        if (line.includes('| ID   | Category   | Title       |')) {
            const detailsLine = lines[index + 2]; // The line after the header
            const trimmedLine = detailsLine.trim().slice(1, -1);
            [id, category, title] = trimmedLine.split('|').map(item => item.trim());
        }
  
        if (line.includes('| Description |')) {
            const descriptionLine = lines[index + 2]; // The line after the header
            description = descriptionLine.trim().slice(1, -1).trim().replace(/<br>/g, '\n');
        }
    });
  
    console.log(`ID: ${id}, Category: ${category}, Title: ${title}, Description: ${description}`);

    return { id, category, title, description };

}

const xlsx = require('xlsx');

function readExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    return data;
}
  
module.exports = {
    writeRequirement,
    readRequirement,
    readExcelFile,
};  
