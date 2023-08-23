import ConvertImage from "./src/ConvertImage.js";
import { red } from "./src/terminalColors.js";

if (process.argv[2] === "-c") {
  if (process.argv[3] === "--name") {
    if (process.argv[4] != undefined) {
      ConvertImage(process.argv[4]);
    } else {
      console.log(`${red("Err:")} Custom name file not found.`);
    }
  } else {
    ConvertImage(undefined);
  }
} else if (process.argv[2] === "-g") {
  console.log("a");
} else {
  console.log(`${red("Err:")} Command not found.`);
}
