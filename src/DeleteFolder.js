import fs from "fs";
import path from "path";

const DeleteFolder = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.readdirSync(filePath).forEach((file) => {
      const currentPath = path.join(filePath, file);

      if (fs.lstatSync(currentPath).isDirectory()) {
        deleteFolderRecursive(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });

    fs.rmdirSync(filePath);
  }
};

export default DeleteFolder;
