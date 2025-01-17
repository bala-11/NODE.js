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
];

runner
  .loadWebsite()
  .then(() => {
    runner.callProcessor().then(() => {
      runner.giveInputs(sampleInputs);
    });
  })
  .catch((error) => {
    console.error(error);
  });
