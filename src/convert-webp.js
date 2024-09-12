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

  static #validateFile(files, input_ext) {
    const TOTAL_FILES = files.length;

    /*
      Ensure that there is a .HEIC file in the ./import folder, if the .HEIC file is not in the ./import folder then the process will be stopped.
    */
    if (TOTAL_FILES === 0) {
      Terminal.error(
        `No images with ${input_ext} format found on folder ${this.#input_path}`,
      );
      Terminal.exit();
    } else if (TOTAL_FILES >= 50) {
      Terminal.info(`Total images: ${Terminal.color('red', TOTAL_FILES)}`);
    } else if (TOTAL_FILES >= 30) {
      Terminal.info(`Total images: ${Terminal.color('yellow', TOTAL_FILES)}`);
    } else {
      Terminal.info(`Total images: ${Terminal.color('green', TOTAL_FILES)}`);
    }
  }

  static async #getFiles(input_ext) {
    const files = await promisify(fs.readdir)(this.#input_path);
    const images = files.filter(
      (file) => path.extname(file) === `.${input_ext}`,
    );

    this.#validateFile(images, input_ext);

    return images;
  }

  static #getNameFile(index, nameFile) {
    if (nameFile !== undefined) {
      /*
        customize name file
      */
      return `${nameFile}-${index}-${Time.dateFormat()}.webp`;
    }

    return `IMG-${index}-${Time.dateFormat()}.webp`;
  }

  static #logProcess(index, totalFile) {
    if (index === totalFile) {
      Terminal.log(
        Terminal.color(
          'green',
          `Process (${index}/${totalFile - index}) Completed`,
        ),
      );
    } else {
      Terminal.log(
        Terminal.color(
          'yellow',
          `Process (${index}/${totalFile - index}) Please Wait...`,
        ),
      );
    }
  }

  static async startConvert(input_ext, inputQuality, nameFile) {
    try {
      Utils.checkAndPrepareFolder(this.#input_path, this.#output_path);

      const files = await this.#getFiles(input_ext);
      const TOTAL_FILES = files.length;

      Terminal.info(
        "If your file is small in size, it won't take much time to process.\n",
      );
      Terminal.log(`Process (0/${TOTAL_FILES}) Starting`);
      this.#start = Time.stopwatch();

      for (let index in files) {
        const INDEXING = Number(index) + 1;

        /*
          ensure that the file exists
        */
        const inputFile = await promisify(fs.readFile)(
          path.join(this.#input_path, files[index]),
        );

        /*
          get size before file convert
        */
        this.#sizeBefore = Utils.getSizeFile(
          `${this.#input_path}/${files[index]}`,
        );

        const NAME_FILE = this.#getNameFile(INDEXING, nameFile);

        /*
          conversion process
        */
        await this.#convertWEBP(inputFile, inputQuality, NAME_FILE);

        this.#logProcess(INDEXING, TOTAL_FILES);

        Terminal.log({
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
      Terminal.info(
        `\n${Terminal.color('green', 'Success')}: Conversion has been successful`,
      );

      Terminal.info({
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

    await sharp(file)
      .webp({ quality: inputQuality === undefined ? 80 : inputQuality })
      .toFile(outputConvertPath);

    this.#sizeAfter = Utils.getSizeFile(outputConvertPath);
  }
}
