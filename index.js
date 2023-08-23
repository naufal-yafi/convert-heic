import ConvertImage from "./src/ConvertImage.js";
import DuplicateFile from "./src/DuplicateFile.js";
import { red } from "./src/terminalColors.js";
import DeleteFolder from "./src/DeleteFolder.js";
import DeleteHEIC from "./src/DeleteHEIC.js";

if (process.argv[2] === "-c") {
  if (process.argv[3] === "--name") {
    if (process.argv[4] !== undefined) {
      ConvertImage(process.argv[4]);
    } else {
      console.log(`${red("Err:")} Custom name file not found.`);
    }
  } else {
    ConvertImage(undefined);
  }
} else if (process.argv[2] === "-g") {
  if (process.argv[3] !== undefined) {
    DuplicateFile(process.argv[3]);
  } else {
    DuplicateFile(10);
  }
} else if (process.argv[2] === "clear") {
  if (process.argv[3] === "-e" || process.argv[3] === "--export") {
    DeleteFolder("./export");
  } else if (process.argv[3] === "-i" || process.argv[3] === "--import") {
    DeleteHEIC("./import");
  } else {
    console.log(`${red("Err:")} Command not found.`);
  }
} else {
  console.log(`${red("Err:")} Command not found.`);
}
