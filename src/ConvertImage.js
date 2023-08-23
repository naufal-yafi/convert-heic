import path from "path";
import fs from "fs";
import convert from "heic-convert";
import { promisify } from "util";
import calculate from "./calculate.js";
import dateFormat from "./dateFormat.js";
import stopwatch from "./stopwatch.js";
import { green, red, yellow } from "./terminalColors.js";

const ConvertImage = async (nameFile) => {
  const config = {
    output_path: "./export",
    input_path: "./import",
    input_ext: ".HEIC",
  };

  let start, end;

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
        `\n${red("Err:")} No images with .HEIC format found on folder import.`
      );
    } else {
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

      start = stopwatch();

      for (let index in heicFiles) {
        const inputFile = await promisify(fs.readFile)(
          path.join(config.input_path, heicFiles[index])
        );

        const outputFile = await convert({
          buffer: inputFile,
          format: "JPEG",
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

        const INDEXING = Number(index) + 1;
        let customFormat = `IMG-${INDEXING}-${dateFormat()}.jpg`;

        if (nameFile != undefined) {
          customFormat = `${nameFile}-${INDEXING}-${dateFormat()}.jpg`;
        }

        await promisify(fs.writeFile)(
          path.join(config.output_path, customFormat),
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
    }
  } catch (error) {
    console.log(red("An error occurred:"), error);
  }
};

export default ConvertImage;
