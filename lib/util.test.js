const fs = require('fs');
const { writeRequirement, readRequirement } = require('./util');

jest.mock('fs');

describe('writeRequirement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should write the correct content to a file', () => {
    const reqmntID = '001';
    const reqmntCat = 'Category1';
    const reqmntTitle = 'Title1';

    const expectedContent = `# Requirement ${reqmntID}

| ID   | Category   | Title       |
|------|------------|-------------|
| ${reqmntID} | ${reqmntCat} | ${reqmntTitle} |

`;

    writeRequirement(reqmntID, reqmntCat, reqmntTitle);

    expect(fs.writeFileSync).toHaveBeenCalledWith(`Req${reqmntID}.md`, expectedContent, 'utf8');
  });
});

describe('readRequirement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should read the correct content from a file and print it', () => {
    const reqmntID = '001';
    const content = `# Requirement ${reqmntID}

| ID   | Category   | Title       |
|------|------------|-------------|
| ${reqmntID} | Category1 | Title1 |

`;
    fs.readFileSync.mockReturnValue(content);

    console.log = jest.fn();

    readRequirement(reqmntID);

    expect(console.log).toHaveBeenCalledWith('ID: 001, Category: Category1, Title: Title1');
  });
});