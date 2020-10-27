const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {readFile} = require("./file");
const {convertFile} = require("./file");
const {createFile} = require("./file");
const {speechToTextAPI} = require("./SpeechToTextAPI");
const destinationFilePath = __dirname + `\\audio\\audioFile.flac`;
app.use(bodyParser.raw({type: 'audio/webm'}));
const transcriptPath = __dirname + `\\transcript\\transcript.txt`;

app.get('/text', ((req, res) => {
	readFile(transcriptPath).then(data => {
		res.send(data);
	}).catch(error => {
		res.sendStatus(400);
		console.error(error);
	});
}));


app.post('/file', (req, res) => {
	if (req.body) {
		createFile(req.body).then(filePath => {
			convertFile(filePath, destinationFilePath).then(fp => {
				speechToTextAPI(fp).then(transcription => {
					createFile(transcription, transcriptPath).then(() => {
						res.send(transcription);
					});
				});
			})

		}).catch(console.error);
	} else {
		res.sendStatus(400);
	}
});
const server = app.listen(process.env.PORT || 9000);
const shutDown = () => server.close();

