import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as fs from 'fs';

const doc = new Document();

doc.addSection({
  properties: {},
  children: [
    new Paragraph({
      children: [
        new TextRun('Hello World'),
        new TextRun({
          text: 'Foo Bar',
          bold: true,
        }),
        new TextRun({
          text: '\tGithub is the best',
          bold: true,
        }),
      ],
    }),
  ],
});

export const generateParagraphs = () => {
  Packer.toBuffer(doc).then((buffer) =>
    fs.writeFileSync('test-para.docx', buffer)
  );
};
