const https = require('https');
const fs = require('fs');
const path = require('path');

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);

    const agent = new https.Agent({rejectUnauthorized :false})
    
    https.get(url,{agent}, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close(() => resolve(outputPath)); // Close file after downloading
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => reject(err)); // Delete file on error
    });

    file.on('error', (err) => {
      fs.unlink(outputPath, () => reject(err)); // Delete file on stream error
    });
  });
}

// Usage
const url = 'https://tse3.mm.bing.net/th/id/OIP.Ts-fwalyPTkagypCBaqatQAAAA?pid=ImgDet&w=191&h=238&c=7';
const outputPath = path.resolve(__dirname,'images','image.png');

downloadFile(url, outputPath)
  .then((filePath) => console.log(`Downloaded file to ${filePath}`))
  .catch((err) => console.error(`Error: ${err.message}`));
