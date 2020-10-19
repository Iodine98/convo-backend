const fs = require('fs');


exports.createDirectory = (path) => {
	const fullPath = __dirname + `\\${path}`;
	fs.stat(fullPath, ((err) => {
		if (err == null) {
			console.log(fullPath + " is an existing directory.");
		} else if (err.code === 'ENOENT') {
			fs.mkdirSync(fullPath);
			console.log(fullPath + " directory has been created.");
		} else {
			throw err;
		}
	}));
	return fullPath;
}

exports.createFile = (file, location) => {
	const fullPath = location + `\\${file.originalname}`;
	fs.writeFileSync(fullPath, Buffer.from(new Uint8Array(file.buffer)));
	return fullPath;
}
