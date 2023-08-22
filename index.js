import dotenv from "dotenv";
import fs from "fs";
import convert from "heic-convert";
import path from "path";
import { promisify } from "util";
import calculate from "./src/calculate.js";
import dateFormat from "./src/dateFormat.js";
import stopwatch from "./src/stopwatch.js";
import { green, red, yellow } from "./src/terminalColors.js";
dotenv.config();

const FORMAT =
  process.env.OUTPUT_FORMAT != "JPEG" || process.env.OUTPUT_FORMAT != "PNG"
    ? "JPEG"
    : process.env.OUTPUT_FORMAT;

const OUTPUT_FILE_EXTENSION = FORMAT;
const OUTPUT_FOLDER_PATH = "./export";

const INPUT_FOLDER_PATH = "./import";
const INPUT_FILE_EXTENSION = ".HEIC";

let start;
let end;

const main = async () => {
  try {
    if (!fs.existsSync(OUTPUT_FOLDER_PATH)) {
      fs.mkdirSync(OUTPUT_FOLDER_PATH);
    }

    const inputFiles = await promisify(fs.readdir)(INPUT_FOLDER_PATH);
    const heicFiles = inputFiles.filter(
      (file) => path.extname(file) === INPUT_FILE_EXTENSION
    );

    const TOTAL_FILES = heicFiles.length;

    if (TOTAL_FILES >= 50) {
      console.log(`${green("Total Images:")} ${red(TOTAL_FILES)}`);
    } else if (TOTAL_FILES >= 30) {
      console.log(`${green("Total Images:")} ${yellow(TOTAL_FILES)}`);
    } else {
      console.log(`${green("Total Images:")} ${green(TOTAL_FILES)}`);
    }

    console.log(
      "If your file is small then the process needed doesn't take a lot of time.\n"
    );

    console.log(`Process (0/${TOTAL_FILES}) Starting`);

    if (heicFiles) {
      start = stopwatch();

      for (let index in heicFiles) {
        const inputFile = await promisify(fs.readFile)(
          path.join(INPUT_FOLDER_PATH, heicFiles[index])
        );

        const outputFile = await convert({
          buffer: inputFile,
          format: OUTPUT_FILE_EXTENSION,
        });

        if (Number(index) + 1 === TOTAL_FILES) {
          console.log(
            green(
              `Process (${Number(index) + 1}/${
                TOTAL_FILES - (Number(index) + 1)
              }) Completed`
            )
          );
        } else {
          console.log(
            yellow(
              `Convert (${Number(index) + 1}/${
                TOTAL_FILES - (Number(index) + 1)
              }) Please Wait...`
            )
          );
        }

        await promisify(fs.writeFile)(
          path.join(OUTPUT_FOLDER_PATH, `IMG-${index}-${dateFormat()}.jpg`),
          outputFile
        );
      }

      end = stopwatch();
      console.log(`\n${green("Success:")} Conversion has been successful.`);
      console.log({
        start: start,
        end: end,
        time: calculate(start, end),
      });
    } else {
      console.log(`\n${green("Err:")} No images with .HEIC format found.`);
    }
  } catch (error) {
    console.log(red("An error occurred:"), error);
  }
};

main();
