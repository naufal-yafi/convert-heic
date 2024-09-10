import fs from 'fs';
import path from 'path';
import { Terminal } from './terminal.js';

export class DeleteFile {
  static #pathExport = './export';
  static #folderExist = [
    '/duplicate-images',
    '/compress-images',
    '/convert-images',
  ];

  static startDelete() {
    try {
      for (const folder of this.#folderExist) {
        const path = `${this.#pathExport}${folder}`;
        if (fs.existsSync(path)) {
          console.log(
            `${Terminal.color('yellow', 'Deleting')}... on folder ${Terminal.color('green', path)}`,
          );
          this.#deletingFiles(path);
        }
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
        Terminal.exit();
      }

      if (files.length > 0) {
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
        Terminal.exit();
      }
    });
  }
}
