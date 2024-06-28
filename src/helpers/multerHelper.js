// multerHelper.js
const multer = require('multer');
const path = require('path');

function configureMulterStorage(destination) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });

  return multer({ storage });
}

module.exports = configureMulterStorage;
