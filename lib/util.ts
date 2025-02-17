import * as fs from 'fs';
import * as xlsx from 'xlsx';

export interface Requirement {
  id: string;
  category: string;
  title: string;
  description: string;
  controls_reference: string;
}

export function writeRequirement(requirement: Requirement): void {
  const { id, category, title, description, controls_reference } = requirement;
  const formattedDescription = description.replace(/\r\n/g, '<br>');
  const content = `# Requirement ${id}

| ID   | Category   | Title       |
|------|------------|-------------|
| ${id} | ${category} | ${title} |

| Description |
| ----- |
| ${formattedDescription} |

`;

  fs.writeFileSync(`Req${id}.md`, content, 'utf8');
}

export function readRequirement(reqmntID: string): Requirement {
  const content = fs.readFileSync(`Req${reqmntID}.md`, 'utf8');
  const lines = content.split('\n');

  let id = '';
  let category = '';
  let title = '';
  let description = '';
  let controls_reference = '';

  lines.forEach((line, index) => {
    if (line.includes('| ID   | Category   | Title       |')) {
      const detailsLine = lines[index + 2]; // The line after the header
      const trimmedLine = detailsLine.trim().slice(1, -1);
      [id, category, title] = trimmedLine.split('|').map(item => item.trim());
    }

    if (line.includes('| Description |')) {
      const descriptionLine = lines[index + 2]; // The line after the header
      description = descriptionLine.trim().slice(1, -1).trim().replace(/<br>/g, '\r\n');
    }
  });

  return { id, category, title, description, controls_reference };
}

export function readExcelFile(filePath: string): any[] {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet, { defval: '' });

  return data;
}