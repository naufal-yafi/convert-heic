import fs from 'fs';
import convert from 'heic-convert';
import path from 'path';
import { promisify } from 'util';
import { Terminal } from './terminal.js';
import { Time } from './time.js';
import { Utils } from './utils.js';

export class ConvertHEIC {
  static #input_path = './import';
  static #output_path = './export/convert-heic';
  static #input_ext = '.HEIC';
  static #start;
  static #end;
  static #sizeBefore;
  static #sizeAfter;
  static #outputFile;

  static #validateHeicFiles(heicFiles) {
    const TOTAL_FILES = heicFiles.length;

    /*
      Ensure that there is a .HEIC file in the ./import folder, if the .HEIC file is not in the ./import folder then the process will be stopped.
    */
    if (TOTAL_FILES === 0) {
      Terminal.error(
        `No images with .HEIC format found on folder ${this.#input_path}`,
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

  static async #getHeicFiles() {
    const files = await promisify(fs.readdir)(this.#input_path);
    const heicFiles = files.filter(
      (file) => path.extname(file) === this.#input_ext,
    );

    this.#validateHeicFiles(heicFiles);

    return heicFiles;
  }

  static async #convertTo(inputFile, output_ext) {
    /*
      convert from .HEIC to jpeg or png
    */
    return await convert({
      buffer: inputFile,
      format: output_ext.toUpperCase(),
    });
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

  static #getNameFile(index, output_ext, nameFile) {
    if (nameFile !== undefined) {
      /*
        customize name file
      */
      return `${nameFile}-${index}-${Time.dateFormat()}.${output_ext.toLowerCase()}`;
    }

    return `IMG-${index}-${Time.dateFormat()}.${output_ext.toLowerCase()}`;
  }

  static async startConvert(output_ext, nameFile) {
    try {
      Utils.checkAndPrepareFolder(this.#input_path, this.#output_path);

      const heicFiles = await this.#getHeicFiles();
      const TOTAL_FILES = heicFiles.length;

      Terminal.info(
        "If your file is small in size, it won't take much time to process.\n",
      );
      Terminal.log(`Process (0/${TOTAL_FILES}) Starting`);
      this.#start = Time.stopwatch();

      for (let index in heicFiles) {
        const INDEXING = Number(index) + 1;

        /*
          ensure that the file exists
        */
        const inputFile = await promisify(fs.readFile)(
          path.join(this.#input_path, heicFiles[index]),
        );

        /*
          get size before file convert
        */
        this.#sizeBefore = Utils.getSizeFile(
          `${this.#input_path}/${heicFiles[index]}`,
        );

        /*
          conversion process
        */
        const outputConvert = await this.#convertTo(inputFile, output_ext);

        this.#logProcess(INDEXING, TOTAL_FILES);

        const NAME_FILE = this.#getNameFile(INDEXING, output_ext, nameFile);

        this.#outputFile = `${this.#output_path}/${NAME_FILE}`;

        /*
          saves the file into the ./export folder
        */
        await promisify(fs.writeFile)(
          path.join(this.#output_path, NAME_FILE),
          outputConvert,
        );

        /*
          get size after file convert
        */
        this.#sizeAfter = fs.statSync(`${this.#output_path}/${NAME_FILE}`).size;

        Terminal.log({
          file: {
            input: `${this.#input_path}/${heicFiles[index]}`,
            output: this.#outputFile,
          },
          size: {
            before: Utils.convertToMB(this.#sizeBefore),
            after: Utils.convertToMB(this.#sizeAfter),
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
}
