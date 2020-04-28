import { Document, Packer, Paragraph, Table, TableCell, TableRow } from 'docx';
export const doc = new Document();

const table = new Table({
  width: { size: 100, type: 'pct' },
  borders: {
    top: {
      color: '#ffffff',
    },
    // bottom: {
    //   color: '#ffffff',
    // },
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
          children: [
            new Paragraph(
              'Hello fdka fkdls akflds fksldf dlafkdlsje kdjgie kj gegj lif eigj ijge gjel akjf kdj flej giej gkd'
            ),
          ],
        }),
        new TableCell({
          width: { size: 50, type: 'pct' },
          children: [],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          width: { size: 50, type: 'pct' },
          children: [],
        }),
        new TableCell({
          width: { size: 50, type: 'pct' },
          children: [new Paragraph('World')],
        }),
      ],
    }),
  ],
});

doc.addSection({
  children: [table],
});
