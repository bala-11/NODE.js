const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const tts = require("./IVRTestingFile")

app.use(express.static(path.join(__dirname, "Text-to-speech-app-main")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Text-to-speech-app-main', 'index.html'));
});

app.listen(port, () => {
  console.log(`TTS Engine running at http://localhost:${port}`);
});

tts.testWebsite()
