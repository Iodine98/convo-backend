const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {convertFile} = require("./file");
const {createFile} = require("./file");
const {speechToTextAPI} = require("./SpeechToTextAPI");
const destinationFilePath = __dirname + `\\audio\\audioFile.flac`;
app.use(bodyParser.raw({type: 'audio/webm'}));

app.post('/file', (req, res) => {
	console.log(req.header('Sign'));
	if (req.body) {
		const filePath = createFile(req.body);
		const flac_filePath = convertFile(filePath, destinationFilePath);
		speechToTextAPI(flac_filePath).then(transcription => {
			res.setHeader('code', 200);
			res.send(transcription);
		}).catch(error => {
			console.error(error);
			res.sendStatus(400);
		});
	} else {
		res.setHeader('Sign', req.header('Sign'));
		res.sendStatus(400);
	}
});
app.listen(process.env.PORT || 9000);
// const shutDown = () => server.close();

