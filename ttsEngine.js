const express = require("express");
const path = require("path");
const app = express();
const port = 3001;
const runner = require("./IVRTestingFile");
const runnerLite = require("./pgTeST");

app.use(express.static(path.join(__dirname, "Text-to-speech-app-main")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Text-to-speech-app-main", "index.html"));
});

app.listen(port, () => {
  
  console.log(new Date(),`TTS Engine running at http://localhost:${port}`);
});

var sampleInputs = [
  "I am Marco",
  "my age is 28",
  "It is 1234567890",
  "March 11 2001",
  "I am in Hyderabad right now",
  "The aadhar number is 123456789012",
];

/**
 * Run the test tool if captcha
 */
// runner.callProcessor().then(() => {
//     runner.loadWebsite().then(() => {
//           runner.giveInputs(sampleInputs);
//       });
//     })
//   .catch((error) => {
//     console.error(error);
// });

/**
 * Tool without captcha required on call receiver
 */
runnerLite
  .callProcessor()
  .then(() => {
    runner.loadWebsite().then(() => {
      runner.giveInputs(sampleInputs);
    });
  })
  .catch((error) => {
    console.error(error);
  });

/**
 *  call is getting delay to get connected, need to add makeCall.click()
 *  Reduce the sleep times in IVRtestings suite
 *  Need to automate the captcha in gmail login
 *  Captcha is on and off while switch networks
 *
 */
