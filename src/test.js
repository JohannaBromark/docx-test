import {
  Document,
  Paragraph,
  HeadingLevel,
  Packer,
  Media,
  HorizontalPositionRelativeFrom,
  HorizontalPositionAlign,
  VerticalPositionRelativeFrom,
  VerticalPositionAlign,
  TableRow,
  TableCell,
  Table,
} from 'docx';
import * as fs from 'fs';

const doc = new Document();

console.log('hello world');

const image1 = Media.addImage(
  doc,
  fs.readFileSync('./assets/hedgehog.jpg'),
  500,
  500
  //   {
  //     floating: {
  //       horizontalPosition: {
  //         relative: HorizontalPositionRelativeFrom.LEFT_MARGIN,
  //         align: HorizontalPositionAlign.LEFT,
  //       },
  //       verticalPosition: {
  //         relative: VerticalPositionRelativeFrom.PAGE,
  //         align: VerticalPositionAlign.TOP,
  //       },
  // },
  //   }
);

// const image2 = Media.addImage(
//   doc,
//   fs.readFileSync('./assets/hedgehog.jpg'),
//   200,
//   200,
//   {
//     horizontalPosition: {
//       offset: 1014400,
//     },
//     verticalPosition: {
//       offset: 1014400,
//     },
//   }
// );

const table = new Table({
  rows: [
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph('Skills')] }),
        new TableCell({ children: [new Paragraph('Test')] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph('Projects')] }),
        new TableCell({ children: [new Paragraph('Tost')] }),
      ],
    }),
  ],
});

doc.addSection({
  //   margins: {
  //     top: 100,
  //     right: 100,
  //     bottom: 100,
  //     left: 100,
  //   },
  children: [
    new Paragraph({
      text: 'HEADING 1',
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({
      text: 'HEADING 2',
      heading: HeadingLevel.HEADING_2,
    }),
    new Paragraph({
      text: 'HEADING 3',
      heading: HeadingLevel.HEADING_3,
    }),
    new Paragraph(image1),
    table,
  ],
});
export const generateDoc = () => {
  Packer.toBuffer(doc).then((buffer) =>
    fs.writeFileSync('test-doc.docx', buffer)
  );
};
