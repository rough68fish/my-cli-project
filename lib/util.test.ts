import * as fs from 'fs';
import { writeRequirement, readRequirement, Requirement } from './util';

jest.mock('fs');

describe('writeRequirement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should write the correct content to a file', () => {
    const requirement: Requirement = {
      id: '001',
      category: 'Category1',
      title: 'Title1',
      description: 'This is a test requirement.',
      controls_reference: 'Control1, Control2'
    };

    const expectedContent = `# Requirement ${requirement.id}

| ID   | Category   | Title       |
|------|------------|-------------|
| ${requirement.id} | ${requirement.category} | ${requirement.title} |

| Description |
| ----- |
| ${requirement.description.replace(/\r\n/g, '<br>')} |

`;

    writeRequirement(requirement);

    expect(fs.writeFileSync).toHaveBeenCalledWith(`Req${requirement.id}.md`, expectedContent, 'utf8');
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
      description: 'This is a test requirement.',
      controls_reference: ''
    });
  });
});