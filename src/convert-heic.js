import fs from 'fs';
import convert from 'heic-convert';
import path from 'path';
import { promisify } from 'util';
import { Terminal } from './terminal.js';
import { Time } from './time.js';

export class ConvertHEIC {
  static #input_path = './import';
  static #output_path = './export/convert-heic';
  static #input_ext = '.HEIC';
  static #start;
  static #end;

  static async startConvert(output_ext, nameFile) {
    try {
      if (!fs.existsSync(this.#input_path)) {
        fs.mkdirSync(this.#input_path);
      }

      if (!fs.existsSync(this.#output_path)) {
        fs.mkdirSync(this.#output_path);
      }

      const inputFiles = await promisify(fs.readdir)(this.#input_path);
      const heicFiles = inputFiles.filter(
        (file) => path.extname(file) === this.#input_ext,
      );

      const TOTAL_FILES = heicFiles.length;

      if (TOTAL_FILES === 0) {
        Terminal.error('No images with .HEIC format found on folder import.');
        Terminal.exit();
      } else if (TOTAL_FILES >= 50) {
        console.log(`Total images: ${Terminal.color('red', TOTAL_FILES)}`);
      } else if (TOTAL_FILES >= 30) {
        console.log(`Total images: ${Terminal.color('yellow', TOTAL_FILES)}`);
      } else {
        console.log(`Total images: ${Terminal.color('green', TOTAL_FILES)}`);
      }

      console.log(
        "If your file is small in size, it won't take much time to process.\n",
      );
      console.log(`Process (0/${TOTAL_FILES}) Starting`);
      this.#start = Time.stopwatch();

      for (let index in heicFiles) {
        const inputFile = await promisify(fs.readFile)(
          path.join(this.#input_path, heicFiles[index]),
        );

        const outputConvert = await convert({
          buffer: inputFile,
          format: output_ext,
        });

        if (Number(index) + 1 === TOTAL_FILES) {
          console.log(
            Terminal.color(
              'green',
              `Process (${Number(index) + 1}/${
                TOTAL_FILES - (Number(index) + 1)
              }) Completed`,
            ),
          );
        } else {
          console.log(
            Terminal.color(
              'yellow',
              `Process (${Number(index) + 1}/${
                TOTAL_FILES - (Number(index) + 1)
              }) Please Wait...`,
            ),
          );
        }

        const INDEXING = Number(index) + 1;
        let customFormat = `IMG-${INDEXING}-${Time.dateFormat()}.${output_ext}`;

        if (nameFile !== undefined) {
          customFormat = `${nameFile}-${INDEXING}-${Time.dateFormat()}.${output_ext}`;
        }

        await promisify(fs.writeFile)(
          path.join(this.#output_path, customFormat),
          outputConvert,
        );
      }

      this.#end = Time.stopwatch();
      console.log(
        `\n${Terminal.color('green', 'Success')}: Conversion has been successful`,
      );

      console.log({
        start: this.#start,
        end: this.#end,
        duration: Time.calculate(this.#start, this.#end),
      });
    } catch (err) {
      Terminal.error(`An error occurred, ${err.message}`);
    }
  }
}
