const fs = require('fs');
const path = require('path');

const paths = [
  {
    folderPath: 'dist/Voyages/USA2015/maxi/',
    jsonFilePath: 'dist/Voyages/USA2015/maxi/photos.json',
    filename: '/Voyages/USA2015/maxi/'
  },
  {
    folderPath: 'dist/Voyages/Socorro2017/maxi/terre/mexico/',
    jsonFilePath: 'dist/Voyages/Socorro2017/maxi/terre/mexico/photos.json',
    filename: '/Voyages/Socorro2017/maxi/terre/mexico/'
  },
  {
    folderPath: 'dist/Voyages/Socorro2017/maxi/terre/teotihuacan/',
    jsonFilePath: 'dist/Voyages/Socorro2017/maxi/terre/teotihuacan/photos.json',
    filename: '/Voyages/Socorro2017/maxi/terre/teotihuacan/'
  },
  {
    folderPath: 'dist/Voyages/Socorro2017/maxi/terre/puebla_cholula/',
    jsonFilePath: 'dist/Voyages/Socorro2017/maxi/terre/puebla_cholula/photos.json',
    filename: '/Voyages/Socorro2017/maxi/terre/puebla_cholula/'
  },
  {
    folderPath: 'dist/Voyages/Socorro2017/maxi/terre/croisiere/',
    jsonFilePath: 'dist/Voyages/Socorro2017/maxi/terre/croisiere/photos.json',
    filename: '/Voyages/Socorro2017/maxi/terre/croisiere/'
  },
  {
    folderPath: 'dist/Voyages/Socorro2017/maxi/terre/decameron/',
    jsonFilePath: 'dist/Voyages/Socorro2017/maxi/terre/decameron/photos.json',
    filename: '/Voyages/Socorro2017/maxi/terre/decameron/'
  },
  {
    folderPath: 'dist/Voyages/Socorro2017/maxi/eau/',
    jsonFilePath: 'dist/Voyages/Socorro2017/maxi/eau/photos.json',
    filename: '/Voyages/Socorro2017/maxi/eau/'
  }
];

paths.forEach(_path => {
  console.log(_path);
  fs.readdir(_path.folderPath, (err, files) => {
  
    if (err) {
      console.error('Error reading the folder:', err);
      return;
    }
  
    const imageFiles = files.filter(file => {
      const fileExtension = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension);
    });
  
    // Generate paginated data
    const imagesPerPage = 48;
    const paginatedImages = [];
    let currentPage = 0;
    imageFiles.forEach((filename, index) => {
      if (index % imagesPerPage === 0) {
        currentPage++;
      }
      paginatedImages.push({
        filename: _path.filename + filename,
        page: currentPage
      });
    });
  
    // Construct JSON data with paginated images
    const jsonData = {
      images: paginatedImages
    };
  
    fs.writeFile(_path.jsonFilePath, JSON.stringify(jsonData, null, 2), err => {
      if (err) {
        console.error('Error writing JSON file:', err);
        return;
      }
      console.log('JSON file with paginated images list has been created successfully in ', _path.folderPath);
    });
  });
});