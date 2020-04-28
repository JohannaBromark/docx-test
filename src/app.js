import { Packer } from 'docx';
import * as fs from 'fs';

import { generateDoc as generateDocTest } from './test';
import { generateDoc as generateDocCV } from './example-cv';
import { generateParagraphs } from './example-p';
import { generateParagraphsAdv } from './example-p-advanced';
import { doc as bulletDoc } from './example-bullet';
import { doc as tableDoc } from './example-table';
import { doc as cvDoc } from './cv';

// generateDocTest();
// generateDocCV();
// generateParagraphs();
// generateParagraphsAdv();

Packer.toBuffer(cvDoc).then((buffer) => fs.writeFileSync('cv.docx', buffer));
