import speech from "@google-cloud/speech";

async function SpeechToTextAPI(audioBlob) {
	const client = new speech.SpeechClient();
	const audioBytes = audioBlob.toString('base64');
	const audio = {
		content: audioBytes,
	};
	const config = {
		encoding: 'LINEAR16',
		sampleRateHertz: 16000,
		languageCode: 'en-US',
	};
	const request = {
		audio,
		config,
	}

	const [response] = await client.recognize(request);
	const transcription = response.results
		.map(result => result.alternatives[0].transcript)
		.join('\n');
	console.log(`Transcription: ${transcription}`);
}
// SpeechToTextAPI().catch(console.error);
