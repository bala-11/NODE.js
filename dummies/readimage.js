const https = require('https');
const fs = require('fs');
require('dotenv').config()
const path = require('path');
// const AWS = require('aws-sdk');
const Redis = require('ioredis')
const rc = new Redis({
  host : process.env.redis_host,
  port : process.env.redis_port
})

rc.on("connect",()=>{
  console.log(`Redis connected successfully`);
})

async function downloadFile(url, outputPath) {
  const file = fs.createWriteStream(outputPath);
  const agent = new https.Agent({ rejectUnauthorized: false });

  try {
    const response =  new Promise((resolve, reject) => {
      https.get(url, { agent }, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
          return;
        }
        response.pipe(file);

        file.on('finish', () => {
          file.close(() => resolve(response)); 
        });
      }).on('error', reject); 
    });
    await response
    return outputPath; 
  } catch (err) {
    fs.unlink(outputPath, () => {});
    throw err; 
  }
}

async function processUsers() {
  const users = ["Olivia", "Liam", "Emma"]
  var map = new Map()
for(let i=0;i<users.length;i++){
  const url = 'https://tse3.mm.bing.net/th/id/OIP.Ts-fwalyPTkagypCBaqatQAAAA?pid=ImgDet&w=191&h=238&c=7';
  const outputPath = path.resolve(__dirname,'images',`${users[i]}-image.png`);
  var filePath = await downloadFile(url,outputPath)
  try {
    if(map.has(users[i])){
      var getFilePath = map.get(users[i])
      console.log(`Existing File path ${users[i]} : ${getFilePath}`);
    }
    else{
      map.set(users[i],filePath)
      await rc.set(users[i],filePath,"EX",300)
      console.log(`File path created for ${users[i]} : ${filePath}`);
    }
  } catch (error) {
    console.error("Error in file creation" + error)
  }
}
}

async function deleteFileByUserName(user) {
  console.log(`Deleting stored file of ${user}`);
  const filePath = await rc.get(user)
  await rc.del(user)
  fs.unlink(filePath,(err)=>{
    if(err) {
      console.log(`Error in deleting ${err}`); 
    }
    else{
      console.log(`File deleted successfully`);
    }
  })
}
// deleteFileByUserName("Emma")
processUsers()

setTimeout(()=>{
  deleteFileByUserName("Emma")
},10000)


  // // Set the region and credentials for the AWS SDK
  // AWS.config.update({
  //   accessKeyId: 'YOUR_AWS_ACCESS_KEY',
  //   secretAccessKey: 'YOUR_AWS_SECRET_KEY',
  //   region: 'YOUR_AWS_REGION'
  // });
  
  // // Create an S3 service object
  // const s3 = new AWS.S3();
  
  // // Path to the image file on your local machine
  // const filePath = './path/to/your/image.jpg';
  
  // // Read the file from your local file system
  // const fileContent = fs.readFileSync(filePath);
  
  // // Set up the S3 upload parameters
  // const params = {
  //   Bucket: 'YOUR_BUCKET_NAME',      // The name of your S3 bucket
  //   Key: path.basename(filePath),    // The name of the file to save as in S3 (e.g., image.jpg)
  //   Body: fileContent,               // The file content
  //   ContentType: 'image/jpeg',        // MIME type of the file (change if needed)
  //   ACL: 'public-read'               // You can set permissions (e.g., public-read)
  // };
  
  // // Upload the image to S3
  // s3.upload(params, (err, data) => {
  //   if (err) {
  //     console.log('Error uploading the image:', err);
  //   } else {
  //     console.log('Image uploaded successfully:', data.Location);
  //   }
  // });
  