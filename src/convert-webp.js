import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { promisify } from 'util';
import { Terminal } from './terminal.js';
import { Time } from './time.js';
import { Utils } from './utils.js';

export class ConvertWEBP {
  static #input_path = './import';
  static #output_path = './export/convert-webp';
  static #start;
  static #end;
  static #sizeBefore;
  static #sizeAfter;
  static #outputFile;

  static async startConvert(input_ext, inputQuality, nameFile) {
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
          `No images with ${input_ext} format found on folder import.`,
        );
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

      for (let index in files) {
        const inputFile = await promisify(fs.readFile)(
          path.join(this.#input_path, files[index]),
        );

        const INDEXING = Number(index) + 1;
        let customFormat = `IMG-${INDEXING}-${Time.dateFormat()}.webp`;

        if (nameFile !== undefined) {
          customFormat = `${nameFile}-${INDEXING}-${Time.dateFormat()}.webp`;
        }

        // get size before file convert to webp
        this.#sizeBefore = fs.statSync(
          path.join(this.#input_path, files[index]),
        ).size;

        await this.#convertWEBP(inputFile, inputQuality, customFormat);

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

        console.log({
          file: {
            input: `${this.#input_path}/${files[index]}`,
            output: this.#outputFile,
          },
          size: {
            before: Utils.convertToMB(this.#sizeBefore),
            after: Utils.convertToMB(this.#sizeAfter),
            compressed: Utils.percentageCompression(
              this.#sizeBefore,
              this.#sizeAfter,
            ),
          },
        });
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

  static async #convertWEBP(file, inputQuality, nameFile) {
    const outputConvertPath = `${this.#output_path}/${nameFile}`;
    this.#outputFile = outputConvertPath;

    if (
      inputQuality === undefined ||
      inputQuality === null ||
      inputQuality === ''
    ) {
      await sharp(file).webp({ quality: 80 }).toFile(outputConvertPath);
    } else {
      await sharp(file)
        .webp({ quality: inputQuality })
        .toFile(outputConvertPath);
    }

    this.#sizeAfter = fs.statSync(outputConvertPath).size;
  }
}
