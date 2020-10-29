const fs = require('fs');
// Installing ffmpeg is required on the server (add bin folder of ffmpeg package to PATH variable)
const {spawn} = require('child_process')

exports.createFile = (dataBuffer, fullPath = __dirname + '\\audio\\audioFile.webm') => {
	fs.writeFileSync(fullPath, Buffer.from(dataBuffer));
	return fullPath;
}

exports.readFile = (fullPath) => {
	try {
		return fs.readFileSync(fullPath, 'utf8');
	} catch (e) {
		console.error(e);
	}
}

exports.fileToBytes = (filepath) => {
	const file = fs.readFileSync(filepath);
	return file.toString('base64');
};

exports.convertFile = async (filepath, destinationFilePath) => {
	try {
		const ffmpeg = spawn('ffmpeg', ['-y', '-i', filepath, destinationFilePath]);
		ffmpeg.stdout.on('data', data => console.log(`stdout: ${data}`));
		ffmpeg.stderr.on('data', data => console.log(`stderr: ${data}`));
		ffmpeg.on('close', code => console.log(`Conversion has been finished. Process exited with code ${code}`));
	} catch (e) {
		console.error(e);
	}
	return destinationFilePath;
}
