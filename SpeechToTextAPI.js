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
		sampleRateHertz: 48000,
		languageCode: 'en-US',
		audioChannelCount: 2,
	};
	const request = {
		audio,
		config,
	}

	return client.recognize(request).then(response => {
		const transcription = response[0].results
			.map(result => result.alternatives[0].transcript)
			.join('\n');
		return `Transcription: ${transcription}`;
	})

}
