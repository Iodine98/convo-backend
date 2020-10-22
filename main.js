const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer')
const upload = multer();
app.use(express.static(path.join(__dirname, 'build')));
const {createFile} = require("./file");
const {createDirectory} = require("./file");
const {speechToTextAPI} = require("./SpeechToTextAPI");

app.post('/blob', upload.single('audioFile'), (req, res) => {
	if (req.file) {
		new Promise((resolve) => {
			resolve(createDirectory('audio'));
		}).then(location => {
			new Promise((resolve) => {
				resolve(createFile(req.file, location));
			}).then(filePath => {
				speechToTextAPI(filePath).then(transcription => {
					console.log(transcription);
					res.sendStatus(200);
				}).catch(console.error);
			})
		});
	} else {
		res.sendStatus(400);
	}
	shutDown();
});
const server = app.listen(process.env.PORT || 9000);
const shutDown = () => server.close();
