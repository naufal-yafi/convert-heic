import dotenv from "dotenv";
import fs from "fs";
import convert from "heic-convert";
import path from "path";
import { promisify } from "util";
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
      console.log(`Total Images: ${red(TOTAL_FILES)}`);
    } else if (TOTAL_FILES >= 30) {
      console.log(`Total Images: ${yellow(TOTAL_FILES)}`);
    } else {
      console.log(`Total Images: ${green(TOTAL_FILES)}`);
    }

    console.log(
      "If your file is small then the process needed doesn't take a lot of time.\n"
    );

    console.log(`Process (${green(0)}/${TOTAL_FILES})... Please Wait`);

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

        console.log(
          `Process (${green(Number(index) + 1)}/${
            TOTAL_FILES - Number(index + 1)
          })... Please Wait`
        );

        await promisify(fs.writeFile)(
          path.join(OUTPUT_FOLDER_PATH, `IMG-${index}-${dateFormat()}.jpg`),
          outputFile
        );
      }

      end = stopwatch();
      console.log(`\n${green("Success:")} Conversion has been successful.`);
      calculate(start, end);
    } else {
      console.log(`\n${green("Err:")} No images with .HEIC format found.`);
    }
  } catch (error) {
    console.log(red("An error occurred:"), error);
  }
};

const dateFormat = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}${month}${day}-${hours}.${minutes}`;
};

const stopwatch = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

const calculate = (start, end) => {
  const waktuAwal = start;
  const waktuAkhir = end;

  const [jamAwal, menitAwal] = waktuAwal.split(".").map(parseFloat);
  const [jamAkhir, menitAkhir] = waktuAkhir.split(".").map(parseFloat);

  const today = new Date();
  const tanggalAwal = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    jamAwal,
    menitAwal
  );
  const tanggalAkhir = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    jamAkhir,
    menitAkhir
  );

  // Menghitung selisih waktu dalam milidetik
  const selisihMilidetik = tanggalAkhir - tanggalAwal;

  // Menghitung menit dan detik dari selisih waktu
  const selisihDetik = selisihMilidetik / 1000;
  const menit = Math.floor(selisihDetik / 60);
  const detik = Math.round(selisihDetik % 60);

  const red = (text) => `\x1b[31m${text}\x1b[0m`; // red color
  const yellow = (text) => `\x1b[33m${text}\x1b[0m`; // yellow color
  const green = (text) => `\x1b[32m${text}\x1b[0m`; // green color

  const WITH_MINUTES = `${menit}m ${detik}s`;
  const NO_MINUTES = `${detik}s`;

  if (menit >= 10) {
    console.log(`Time required: ${red(WITH_MINUTES)}`);
  } else if (menit >= 3) {
    console.log(`Time required: ${yellow(WITH_MINUTES)}`);
  } else if (menit < 1) {
    console.log(`Time required: ${green(NO_MINUTES)}`);
  } else {
    console.log(`Time required: ${green(WITH_MINUTES)}`);
  }
};

const red = (text) => {
  return `\x1b[31m${text}\x1b[0m`;
};

const green = (text) => {
  return `\x1b[32m${text}\x1b[0m`;
};

const yellow = (text) => {
  return `\x1b[33m${text}\x1b[0m`;
};

main();
