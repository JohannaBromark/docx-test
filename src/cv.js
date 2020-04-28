import {
  Document,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  Media,
  TextRun,
  Header,
  Footer,
} from 'docx';
import * as fs from 'fs';

import { consultant, company } from './consultant';

const font = 'Arial';
const textSize = 18;

export const doc = new Document();

const image1 = Media.addImage(
  doc,
  fs.readFileSync(consultant.imageUrl),
  275,
  275
);

const logo = Media.addImage(doc, fs.readFileSync(company.logo), 125, 40);

const name = new Paragraph({
  spacing: { before: 200, after: 0 },
  children: [
    new TextRun({
      text: consultant.firstLine,
      bold: true,
      size: 26, // 14pt
      allCaps: true,
      font: { name: font },
    }),
  ],
});

const role = new Paragraph({
  spacing: { before: 0, after: 200 },
  children: [
    new TextRun({
      text: consultant.secondLine,
      size: 24,
      font: { name: font },
    }),
  ],
});

const getBulletTitle = (text) => {
  return new Paragraph({
    spacing: { before: 200, after: 50 },
    indent: { left: 200 },
    children: [
      new TextRun({
        text: text,
        size: textSize,
        allCaps: true,
        bold: true,
        font: { name: font },
      }),
    ],
  });
};

const getTitle = (title, text = '') => {
  return new Paragraph({
    spacing: { before: 200, after: 50 },
    children: [
      new TextRun({
        text: title,
        size: textSize,
        allCaps: true,
        bold: true,
        font: { name: font },
      }),
      getText(text),
    ],
  });
};

const getText = (text) => {
  return new TextRun({
    text: text,
    size: textSize,
    font: { name: font },
  });
};

const industries = consultant.branches.map((indutry) => {
  return new Paragraph({
    children: [getText(indutry.name)],
    bullet: { level: 0 },
  });
});

const skills = consultant.scoredSkills.map((skill) => {
  return new Paragraph({
    children: [getText(skill.skill.name)],
    bullet: { level: 0 },
  });
});

const languages = consultant.languages.map((language) => {
  return new Paragraph({
    children: [
      getText(language.language.englishName + ', ' + language.skillLevel),
    ],
    bullet: { level: 0 },
  });
});

const education = consultant.education.map((education) => {
  return new Paragraph({
    children: [getText(education.name + ', ' + education.school)],
    bullet: { level: 0 },
  });
});

const table = new Table({
  width: { size: 100, type: 'pct' },
  borders: {
    top: {
      color: '#ffffff',
    },
    bottom: {
      color: '#ffffff',
    },
    left: {
      color: '#ffffff',
    },
    right: {
      color: '#ffffff',
    },
    insideHorizontal: {
      color: '#ffffff',
    },
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 50, type: 'pct' },
          margins: { right: 250 },
          children: [
            new Paragraph(image1),
            name,
            role,
            getTitle('Profile'),
            new Paragraph({ children: [getText(consultant.summary)] }),
            new Paragraph(' '),
            new Paragraph({ children: [getText(consultant.about)] }),
          ],
        }),
        new TableCell({
          width: { size: 50, type: 'pct' },
          margins: { left: 50 },
          children: [
            getBulletTitle('Industries'),
            ...industries,
            getBulletTitle('Skills'),
            ...skills,
            getBulletTitle('Education'),
            ...education,
            getBulletTitle('Languages'),
            ...languages,
          ],
        }),
      ],
    }),
  ],
});

const experiences = consultant.experience
  .flatMap((experience) => {
    return [
      new Paragraph(''), // Paragraph to prevent the tables from merging
      new Table({
        width: { size: 100, type: 'pct' },
        borders: {
          top: {
            color: '#ffffff',
          },
          bottom: {
            color: '#ffffff',
          },
          left: {
            color: '#ffffff',
          },
          right: {
            color: '#ffffff',
          },
          insideVertical: {
            color: '#ffffff',
          },
        },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                width: { size: 30, type: 'pct' },
                children: [getTitle(experience.from + ' - ' + experience.to)],
              }),
              new TableCell({
                width: { size: 70, type: 'pct' },
                children: [getTitle(experience.secondLine)],
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({ width: { size: 30, type: 'pct' }, children: [] }),
              new TableCell({
                width: { size: 70, type: 'pct' },
                children: [
                  getTitle('Role: ', experience.firstLine),
                  getTitle('Project: ', experience.about),
                ],
              }),
            ],
          }),
        ],
      }),
    ];
  })
  .slice(1); // Remove the first paragraph

doc.addSection({
  headers: {
    default: new Header({
      children: [
        new Paragraph({
          spacing: { after: 600 },
          children: [logo],
        }),
      ],
    }),
  },
  footers: {
    default: new Footer({
      children: [
        new Paragraph(''),
        new Table({
          borders: {
            top: {
              style: 'NONE',
            },
            left: {
              style: 'NONE',
            },
            bottom: {
              style: 'NONE',
            },
            right: {
              style: 'NONE',
            },
            insideVertical: {
              style: 'NONE',
            },
            insideHorizontal: {
              style: 'NONE',
            },
          },
          width: { size: 50, type: 'pct' },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 50, type: 'pct' },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: company.name,
                          bold: true,
                          size: textSize,
                          font: { name: font },
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: 50, type: 'pct' },
                  children: [
                    new Paragraph({
                      children: [getText(company.contactInformation.address)],
                    }),
                    new Paragraph({
                      children: [getText(company.contactInformation.zip)],
                    }),
                    new Paragraph({
                      children: [getText(company.contactInformation.city)],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  },
  children: [table, new Paragraph(''), getTitle('Projects'), ...experiences],
});
