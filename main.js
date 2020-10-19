const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer')
const upload = multer();
app.use(express.static(path.join(__dirname, 'build')));
const {createFile} = require("./file");
const {createDirectory} = require("./file");
const {speechToTextAPI} = require("./SpeechToTextAPI");


app.post('/blob', upload.single('audioBlob'), (req, res) => {
	if (req.file) {
		new Promise((resolve) => {
			resolve(createDirectory('audio'));
		}).then(location => {
			new Promise((resolve) => {
				resolve(createFile(req.file, location));
			}).then(filePath => {
				speechToTextAPI(filePath).then(() => {
					console.log('Successful call');
					res.sendStatus(200);
				}).catch(console.error);
			})
		});
	} else {
		res.sendStatus(400);
	}
	console.log('\n');
});
app.listen(process.env.PORT || 9000);
