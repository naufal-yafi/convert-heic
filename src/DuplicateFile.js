import fs from "fs";
import { promisify } from "util";
import { green, red } from "./terminalColors.js";
import path from "path";
import dateFormat from "./dateFormat.js";

const DuplicateFile = async (count) => {
  const config = {
    input_path: "./duplicate_here",
    output_path: "./import",
    input_ext: ".HEIC",
  };

  try {
    if (!fs.existsSync(config.input_path)) {
      fs.mkdirSync(config.input_path);
    }
    if (!fs.existsSync(config.output_path)) {
      fs.mkdirSync(config.output_path);
    }

    const inputFiles = await promisify(fs.readdir)(config.input_path);
    const heicFiles = inputFiles.filter(
      (file) => path.extname(file) === config.input_ext
    );

    const TOTAL_FILES = heicFiles.length;

    if (TOTAL_FILES == 0) {
      console.log(
        `${red(
          "Err:"
        )} No images with .HEIC format found on folder duplicate_here.`
      );
    } else {
      console.log("Available Files:");
      for (let index in heicFiles) {
        const indicator = `[${Number(index) + 1}]`;
        console.log(`${green(indicator)} ${heicFiles[index]}`);
      }
      const SELECTED_FILE = heicFiles[TOTAL_FILES - 1];
      console.log(`\nSelected files: ${green(SELECTED_FILE)}\n`);

      generateFile(
        `./duplicate_here/${SELECTED_FILE}`,
        config.output_path,
        count
      );
    }
  } catch (error) {
    console.log(red("An error occurred:"), error);
  }
};

const generateFile = (input_file, output_path, count) => {
  fs.readFile(input_file, (err, data) => {
    if (err) {
      console.error("Error reading the source file:", err);
      return;
    }

    console.log(`Total Duplicate: ${count}`);
    for (let i = 1; i <= count; i++) {
      const newFileName = `IMG_${i}_${dateFormat()}_duplicated.HEIC`;
      const newFilePath = path.join(output_path, newFileName);

      fs.writeFile(newFilePath, data, (writeErr) => {
        if (writeErr) {
          console.log(red(`Err duplicate file[${i}]: `), writeErr);
        } else {
          console.log(`${green("Success duplicate: ")} ${newFilePath}`);
        }
      });
    }
  });
};

export default DuplicateFile;
