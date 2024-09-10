import { DeleteFile } from './src/delete-file.js';
import { DuplicateFile } from './src/duplicate-file.js';
import { Terminal } from './src/terminal.js';

if (process.argv[2] === 'convert') {
  if (process.argv[3] === '-f' || process.argv[3] === '--from') {
    /*
      Convert image from .HEIC to PNG or JPEG or JPG
      command: node app convert [-f, --from] HEIC [-t, --to] [PNG, JPEG, JPG]
    */
    if (process.argv[4] === 'HEIC') {
      if (process.argv[5] === '-t' || process.argv[5] === '--to') {
        if (
          process.argv[6] === 'PNG' ||
          process.argv[6] === 'JPEG' ||
          process.argv[6] === 'JPG'
        ) {
          console.log('//');

          Terminal.exit();
        } else {
          Terminal.error('Missing file format [PNG, JPG, JPEG]');
          Terminal.exit();
        }
      } else {
        Terminal.error('Missing -t or --to');
        Terminal.exit();
      }
    } else if (
      /*
        Convert PNG or JPEG or JPG to .WEBP
        command: node app convert [-f, --from] [PNG, JPEG, JPG] [-t, --to] WEBP
      */
      (process.argv[4] === 'PNG' || process.argv[4] === 'JPEG',
      process.argv[4] === 'JPG')
    ) {
      if (process.argv[5] === '-t' || process.argv[5] === '--to') {
        if (process.argv[6] === 'WEBP') {
          console.log('//a');

          Terminal.exit();
        } else {
          Terminal.error('Missing WEBP');
          Terminal.exit();
        }
      } else {
        Terminal.error('Missing -t or --to');
        Terminal.exit();
      }
    } else {
      Terminal.error('Missing file format [HEIC, PNG, JPG, JPEG]');
      Terminal.exit();
    }
  } else {
    Terminal.error('Missing -f or --from');
    Terminal.exit();
  }
}

/*
  Compress size
  command: node app compress [PNG, JPEG, JPG]
*/

/*
  duplicate
  command: node app duplicate [HEIC, jpeg, jpg, png]
*/
if (process.argv[2] === 'duplicate') {
  if (
    process.argv[3] === null ||
    process.argv[3] === undefined ||
    process.argv[3] === ''
  ) {
    Terminal.error('Missing file ext [HEIC, jpeg, jpg, png]');
    Terminal.exit();
  } else if (
    process.argv[3] === 'HEIC' ||
    process.argv[3] === 'jpeg' ||
    process.argv[3] === 'jpg' ||
    process.argv[3] === 'png'
  ) {
    if (
      process.argv[4] === null ||
      process.argv[4] === undefined ||
      process.argv[4] === ''
    ) {
      DuplicateFile.startGenerate(process.argv[3].toString(), 1);
    } else {
      DuplicateFile.startGenerate(
        process.argv[3].toString(),
        Number(process.argv[4]),
      );
    }
  } else {
    Terminal.error(
      `Invalid file ext [${Terminal.color(
        'red',
        process.argv[3],
      )}], available ext [${Terminal.color('yellow', 'HEIC, jpeg, jpg, png')}]`,
    );
    Terminal.exit();
  }
}

/*
  Delete folder export
  command: node app clear
*/
if (process.argv[2] === 'clear') {
  DeleteFile.startDelete();
}

/*
  Help
  command: node app or node app [-h, --help]
*/
if (process.argv[2] === '-h' || process.argv[2] === '--help') {
  Terminal.help();
  Terminal.exit();
}
