//external imports
const createHttpError = require("http-errors");
const multer = require("multer");
const path = require("path");

const uploader = (
  subfolderPath,
  allowedFileTypes,
  maxFileSize,
  errorMessage
) => {
  //file upload folder
  const uploadsFolder = `${__dirname}/../public/uploads/${subfolderPath}/`;

  //define storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsFolder);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });

  //final multer upload object
  const upload = multer({
    storage: storage,
    limits: { fileSize: maxFileSize },
    fileFilter: (req, file, cb) => {
      if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createHttpError(errorMessage));
      }
    },
  });

  //make upload object
  return uploader;
};

module.exports = uploader;
