import * as fs from 'fs';
import { writeRequirement, readRequirement } from './util';

jest.mock('fs');

describe('writeRequirement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should write the correct content to a file', () => {
    const reqmntID = '001';
    const reqmntCat = 'Category1';
    const reqmntTitle = 'Title1';
    const description = 'This is a test requirement.';

    const expectedContent = `# Requirement ${reqmntID}

| ID   | Category   | Title       |
|------|------------|-------------|
| ${reqmntID} | ${reqmntCat} | ${reqmntTitle} |

| Description |
| ----- |
| ${description} |

`;

    writeRequirement(reqmntID, reqmntCat, reqmntTitle, description);

    expect(fs.writeFileSync).toHaveBeenCalledWith(`Req${reqmntID}.md`, expectedContent, 'utf8');
  });
});

describe('readRequirement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should read the correct content from a file and return it', () => {
    const reqmntID = '001';
    const content = `# Requirement ${reqmntID}

| ID   | Category   | Title       |
|------|------------|-------------|
| ${reqmntID} | Category1 | Title1 |

| Description |
| ----- |
| This is a test requirement. |

`;
    (fs.readFileSync as jest.Mock).mockReturnValue(content);

    const result = readRequirement(reqmntID);

    expect(result).toEqual({
      id: '001',
      category: 'Category1',
      title: 'Title1',
      description: 'This is a test requirement.'
    });
  });
});