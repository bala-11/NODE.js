const express = require("express");
const path = require("path");
const app = express();
const port = 3001;
const runner = require("./IVRTestingFile");

app.use(express.static(path.join(__dirname, "Text-to-speech-app-main")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Text-to-speech-app-main", "index.html"));
});

app.listen(port, () => {
  console.log(`TTS Engine running at http://localhost:${port}`);
});

var sampleInputs = [
  "Hi How are you",
  "welcome to village cooking channel",
  "hanumantha is good boy",
  "rishav is working on the API developing part",
  "Annamalayaar",
  "Durgadevi is a good girl",
  "Nee ethu panna koodathunu solriyo atha pannuvan",
];

runner.callProcessor().then(() => {
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
 */