import path from "path";
import fs from "fs";
import { green, red } from "./terminalColors.js";

const DeleteHEIC = (folderPath) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    if (files.length > 1) {
      console.log();
      files.forEach((file) => {
        if (path.extname(file) === ".HEIC") {
          const filePath = path.join(folderPath, file);

          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(red("\nError deleting file:"), err);
            } else {
              console.log(red("Deleted file:"), green(filePath));
            }
          });
        }
      });
    } else {
      console.log(red("\nErr: File .HEIC not found"));
    }
  });
};

export default DeleteHEIC;
