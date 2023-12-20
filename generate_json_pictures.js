const fs = require('fs');
const path = require('path');

const folderPath = 'dist/photos'; // Replace with the actual path to your image folder
const jsonFilePath = 'dist/photos/photos.json'; // Replace with the desired path for the output JSON file

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading the folder:', err);
    return;
  }

  const imageFiles = files.filter(file => {
    const fileExtension = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension);
  });

  const jsonData = {
    images: imageFiles.map(filename => ('photos/' + filename))
  };

  fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), err => {
    if (err) {
      console.error('Error writing JSON file:', err);
      return;
    }
    console.log('JSON file with image list has been created successfully.');
  });
});