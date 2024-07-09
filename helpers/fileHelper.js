const fs = require('fs');
const path = require('path');

function deleteFiles(images) {
  const deletePromises = images.map(image => {
    const filePath = image.fileName;
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${filePath}`, err);
          return reject(err);
        }
        resolve();
      });
    });
  });

  return Promise.all(deletePromises);
}

module.exports = {
  deleteFiles,
};
