const fs = require('fs');

function writeRequirement(reqmntID, reqmntCat, reqmntTitle) {
  const content = `# Requirement ${reqmntID}

| ID   | Category   | Title       |
|------|------------|-------------|
| ${reqmntID} | ${reqmntCat} | ${reqmntTitle} |

`;

  fs.writeFileSync(`Req${reqmntID}.md`, content, 'utf8');
}

function readRequirement(reqmntID) {
    const content = fs.readFileSync(`Req${reqmntID}.md`, 'utf8');
    const lines = content.split('\n');
    
    const detailsLine = lines[4]; // Assuming the details are on the 5th line

    //remove the leading '|' and trailing '|' from the line
    const trimmedLine = detailsLine.trim().slice(1, -1);

    const [id, category, title] = trimmedLine.split('|').map(item => item.trim());

    console.log(`ID: ${id}, Category: ${category}, Title: ${title}`);
  }
  
module.exports = {
    writeRequirement,
    readRequirement
};