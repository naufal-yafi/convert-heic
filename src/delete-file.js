import fs from 'fs';
import path from 'path';
import { Terminal } from './terminal.js';

export class DeleteFile {
  static #pathExport = './export';
  static #folderExist = [
    '/duplicate-images',
    '/compress-images',
    '/convert-heic',
    '/convert-webp',
  ];

  static startDelete() {
    try {
      this.#deleting(`${this.#pathExport}${this.#folderExist[0]}`);
      this.#deleting(`${this.#pathExport}${this.#folderExist[1]}`);
      this.#deleting(`${this.#pathExport}${this.#folderExist[2]}`);
      this.#deleting(`${this.#pathExport}${this.#folderExist[3]}`);

      this.#deletingFolder();

      console.log(
        `\n${Terminal.color('green', 'success')}: Complete clear folder export`,
      );
    } catch (err) {
      Terminal.error(`An error occurred ${err.message}`);
      Terminal.exit();
    }
  }

  static #deleting(folderPath) {
    if (fs.existsSync(folderPath)) {
      this.#deletingFiles(folderPath);
    }
  }

  static async #deletingFolder() {
    try {
      if (fs.existsSync('./export')) {
        await fs.promises.rm('./export', { recursive: true, force: true });
      }
    } catch (err) {
      Terminal.error(`An error occurred ${err.message}`);
      Terminal.exit();
    }
  }

  static #deletingFiles(folderPath) {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        Terminal.error(`reading directory ${err.message}`);
      }

      if (files.length > 0) {
        console.log(
          `${Terminal.color('yellow', 'Deleting')}... on folder ${Terminal.color('green', folderPath)}`,
        );
        files.forEach((file) => {
          const filePath = path.join(folderPath, file);

          fs.unlink(filePath, (err) => {
            if (err) {
              Terminal.error(`deleting file, ${err.message}`);
            } else {
              console.log(`${Terminal.color('red', 'Delete')}: ${file}`);
            }
          });
        });
      } else {
        console.log(`Empty file on ${folderPath}`);
      }
    });
  }
}
