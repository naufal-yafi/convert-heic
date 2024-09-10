import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { Terminal } from './terminal.js';
import { Time } from './time.js';

export class DuplicateFile {
  static #input_path = './import';
  static #output_path = './export/duplicate-images';

  static async startGenerate(input_ext, count) {
    if (input_ext === undefined) {
      Terminal.error('Missing ext');
      Terminal.exit();
    }

    try {
      if (!fs.existsSync(this.#input_path)) {
        fs.mkdirSync(this.#input_path);
      }

      if (!fs.existsSync(this.#output_path)) {
        fs.mkdirSync(this.#output_path);
      }

      const inputFiles = await promisify(fs.readdir)(this.#input_path);
      const files = inputFiles.filter(
        (file) => path.extname(file) === `.${input_ext}`,
      );

      const TOTAL_FILES = files.length;

      if (TOTAL_FILES === 0) {
        Terminal.error(
          `No images with .${input_ext} format found on folder ${this.#input_path}`,
        );
        Terminal.exit();
      } else {
        console.log('Available Files:');

        for (let index in files) {
          const indicator = `[${Number(index) + 1}]`;
          console.log(`${Terminal.color('green', indicator)} ${files[index]}`);
        }

        const SELECTED_FILE = files[TOTAL_FILES - 1];

        console.log(
          `\nSelected files: ${Terminal.color('green', SELECTED_FILE)}\n`,
        );

        this.#generateFile(
          `${this.#input_path}/${SELECTED_FILE}`,
          this.#output_path,
          count,
          input_ext,
        );
      }
    } catch (error) {
      Terminal.error(`An error occurred ${error}`);
      Terminal.exit();
    }
  }

  static #generateFile(input_file, output_path, count, ext) {
    fs.readFile(input_file, (err, data) => {
      if (err) {
        Terminal.error(`reading the source file ${err}`);
      }

      console.info(`Total duplicate: ${count}`);

      for (let i = 1; i <= count; i++) {
        const generateFileName = `IMG_${i}_${Time.dateFormat()}_duplicated.${ext}`;
        const generateFilePath = path.join(output_path, generateFileName);

        fs.writeFile(generateFilePath, data, (writeErr) => {
          if (writeErr) {
            Terminal.error(`duplicate file [${i}] ${writeErr}`);
          } else {
            console.log(
              `${Terminal.color(
                'green',
                'Success',
              )}: duplicate ${generateFilePath}`,
            );
          }
        });
      }
    });
  }
}
