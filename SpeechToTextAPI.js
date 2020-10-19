const speech = require('@google-cloud/speech');
const fs = require('fs');

exports.speechToTextAPI = async (filePath) => {
	const client = new speech.SpeechClient();
	const file = fs.readFileSync(filePath)
	const audioBytes = file.toString('base64');
	const audio = {
		content: audioBytes,
	};
	const config = {
		encoding: 'FLAC',
		sampleRateHertz: 16000,
		languageCode: 'en-US',
	};
	const request = {
		audio,
		config,
	}

	const [response] = await client.recognize(request);
	console.log(response.results);
	// const transcription = response.results
	// 	.map(result => result.alternatives[0].transcript)
	// 	.join('\n');
	// console.log(`Transcription: ${transcription}`);
}
