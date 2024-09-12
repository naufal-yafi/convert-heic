import fs from 'fs';

export class Utils {
  static checkAndPrepareFolder(input_path, output_path) {
    /*
      input_path  : default = ./import
      output_path : default = ./export

      Ensure that ./import and ./export folders are available.
    */
    if (!fs.existsSync(input_path)) {
      fs.mkdirSync(input_path);
    }

    if (!fs.existsSync('./export')) {
      fs.mkdirSync('./export');
    }

    if (!fs.existsSync(output_path)) {
      fs.mkdirSync(output_path);
    }
  }

  static convertToMB(bytes) {
    const calculate = bytes / (1024 * 1024);
    return `${calculate.toFixed(2)} MB`;
  }

  static percentageCompression(beforeBytes, afterBytes) {
    const calculate = ((beforeBytes - afterBytes) / beforeBytes) * 100;
    return `${calculate.toFixed(2)}%`;
  }

  static getSizeFile(filePath) {
    return fs.statSync(filePath).size;
  }
}
