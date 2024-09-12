import { ConvertHEIC } from './src/convert-heic.js';
import { ConvertWEBP } from './src/convert-webp.js';
import { DeleteFile } from './src/delete-file.js';
import { DuplicateFile } from './src/duplicate-file.js';
import { Terminal } from './src/terminal.js';

const CALL_FUNCTION = process.argv[2]; // convert, duplicate, clear, -h, --help, help

if (CALL_FUNCTION === 'convert') {
  if (process.argv[3] === '-f' || process.argv[3] === '--from') {
    /*
      Convert image from .HEIC to png or jpeg
      command: node app convert [-f, --from] heic [-t, --to] [png, jpeg] --name [..custom_output_name_file]
      command: node app convert [-f, --from] heic [-t, --to] [png, jpeg]
    */
    const EXT_INPUT_FROM = process.argv[4]; // heic, png, jpeg, jpg

    if (EXT_INPUT_FROM.toUpperCase() === 'HEIC') {
      if (process.argv[5] === '-t' || process.argv[5] === '--to') {
        const EXT_OUTPUT_TO = process.argv[6].toLowerCase(); // png, jpeg

        if (EXT_OUTPUT_TO === 'png' || EXT_OUTPUT_TO === 'jpeg') {
          const INPUT_OPTION = process.argv[7]; // --name, --test, --option

          if (INPUT_OPTION === '--name') {
            // command: node app convert [-f, --from] heic [-t, --to] [png, jpeg] --name [..custom_output_name_file]
            const CUSTOM_NAME_FILE = process.argv[8];

            ConvertHEIC.startConvert(EXT_OUTPUT_TO, CUSTOM_NAME_FILE);
          } else {
            // command: node app convert [-f, --from] heic [-t, --to] [png, jpeg]
            ConvertHEIC.startConvert(EXT_OUTPUT_TO, undefined);
          }
        } else {
          Terminal.error('Missing file format [png, jpeg]');
          Terminal.exit();
        }
      } else {
        Terminal.error('Missing -t or --to');
        Terminal.exit();
      }
    } else if (
      /*
        Convert PNG or JPEG or JPG to .WEBP
        command: node app convert [-f, --from] [png, jpeg, jpg] [-t, --to] webp --quality [..quality]
        command: node app convert [-f, --from] [png, jpeg, jpg] [-t, --to] webp --name [..custom_name_file]
        command: node app convert [-f, --from] [png, jpeg, jpg] [-t, --to] webp --option [..quality] [..custom_name_file]
        command: node app convert [-f, --from] [png, jpeg, jpg] [-t, --to] webp
        */
      EXT_INPUT_FROM.toLowerCase() === 'jpeg' ||
      EXT_INPUT_FROM.toLowerCase() === 'png' ||
      EXT_INPUT_FROM.toLowerCase() === 'jpg'
    ) {
      if (process.argv[5] === '-t' || process.argv[5] === '--to') {
        const EXT_OUTPUT_TO = process.argv[6].toLowerCase(); // webp

        if (EXT_OUTPUT_TO === 'webp') {
          const OPTIONS = process.argv[7]; // --quality, --name, --option

          if (OPTIONS === '--quality') {
            // node app convert [-f, --from] [PNG, JPEG, JPG] [-t, --to] webp --quality [..quality]
            const INPUT_QUALITY = process.argv[8];

            ConvertWEBP.startConvert(EXT_INPUT_FROM, INPUT_QUALITY, undefined);
          } else if (OPTIONS === '--name') {
            // node app convert [-f, --from] [PNG, JPEG, JPG] [-t, --to] webp --name [..custom_name_file]
            const INPUT_CUSTOM_NAME = process.argv[8];

            ConvertWEBP.startConvert(
              EXT_INPUT_FROM,
              undefined,
              INPUT_CUSTOM_NAME,
            );
          } else if (OPTIONS === '--option') {
            // node app convert [-f, --from] [PNG, JPEG, JPG] [-t, --to] webp --option [..quality] [..custom_name_file]
            const INPUT_QUALITY = process.argv[8];
            const INPUT_CUSTOM_NAME = process.argv[9];

            if (
              INPUT_QUALITY === undefined ||
              INPUT_QUALITY === null ||
              INPUT_QUALITY === ''
            ) {
              if (typeof INPUT_QUALITY !== 'number') {
                Terminal.error('Input value quality only number, default: 80');
                Terminal.exit();
              } else {
                Terminal.error('Missing value quality, default: 80');
                Terminal.exit();
              }
            } else if (
              INPUT_CUSTOM_NAME === undefined ||
              INPUT_CUSTOM_NAME === null ||
              INPUT_CUSTOM_NAME === ''
            ) {
              Terminal.error('Missing value custom name');
              Terminal.exit();
            } else {
              // node app convert [-f, --from] [PNG, JPEG, JPG] [-t, --to] webp --option [..quality] [..custom_name_file]
              ConvertWEBP.startConvert(
                EXT_INPUT_FROM,
                INPUT_QUALITY,
                INPUT_CUSTOM_NAME,
              );
            }
          } else {
            ConvertWEBP.startConvert(EXT_INPUT_FROM, undefined, undefined);
          }
        } else {
          Terminal.error('Missing webp');
          Terminal.exit();
        }
      } else {
        Terminal.error('Missing -t or --to');
        Terminal.exit();
      }
    } else {
      console.log(EXT_INPUT_FROM);

      Terminal.error('Missing file format [png, jpg, jpeg]');
      Terminal.exit();
    }
  } else {
    Terminal.error('Missing -f or --from');
    Terminal.exit();
  }
}

/*
  duplicate
  command: node app duplicate [HEIC, jpeg, jpg, png]
*/
if (CALL_FUNCTION === 'duplicate') {
  const INPUT_EXT_FILE = process.argv[3]; // HEIC, jpeg, jpg, png

  if (
    INPUT_EXT_FILE === null ||
    INPUT_EXT_FILE === undefined ||
    INPUT_EXT_FILE === ''
  ) {
    Terminal.error('Missing file ext [HEIC, jpeg, jpg, png]');
    Terminal.exit();
  } else if (
    INPUT_EXT_FILE === 'HEIC' ||
    INPUT_EXT_FILE === 'jpeg' ||
    INPUT_EXT_FILE === 'jpg' ||
    INPUT_EXT_FILE === 'png'
  ) {
    const COUNT_FILE_DUPLICATE = process.argv[4]; // 1, 2, 3, 4, 5, ...x

    if (
      COUNT_FILE_DUPLICATE === null ||
      COUNT_FILE_DUPLICATE === undefined ||
      COUNT_FILE_DUPLICATE === ''
    ) {
      DuplicateFile.startGenerate(INPUT_EXT_FILE.toString(), 1);
    } else {
      DuplicateFile.startGenerate(
        INPUT_EXT_FILE.toString(),
        Number(COUNT_FILE_DUPLICATE),
      );
    }
  } else {
    Terminal.error(
      `Invalid file ext [${Terminal.color(
        'red',
        INPUT_EXT_FILE,
      )}], available ext [${Terminal.color('yellow', 'HEIC, jpeg, jpg, png')}]`,
    );
    Terminal.exit();
  }
}

/*
  Delete folder export
  command: node app clear
*/
if (CALL_FUNCTION === 'clear') {
  DeleteFile.startDelete();
}

/*
  Help
  command: node app or node app [-h, --help]
*/
if (
  CALL_FUNCTION === 'help' ||
  CALL_FUNCTION === '-h' ||
  CALL_FUNCTION === '--help'
) {
  Terminal.help();
  Terminal.exit();
}
