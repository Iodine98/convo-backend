const speech = require('@google-cloud/speech');
const {fileToBytes} = require("./file");


exports.speechToTextAPI = async (filePath) => {
	const client = new speech.SpeechClient();
	const audio = {
		content: fileToBytes(filePath),
	};
	const config = {
		encoding: 'FLAC',
		sampleRateHertz: 48000,
		languageCode: 'en-US',
		audioChannelCount: 1,
	};
	const request = {
		audio,
		config,
	};
	return client.recognize(request).then(response => {
		const transcription = response[0].results
			.map(result => result.alternatives[0].transcript)
			.join('\n');
		console.log(`Transcription: ${transcription}`);
		return transcription;
	});
};
