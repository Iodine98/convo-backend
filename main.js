const express = require('express');
const path = require('path');
const app = express();
const multer  = require('multer')
const fs = require('fs');
const upload = multer();
app.use(express.static(path.join(__dirname, 'build')));


app.post('/blob', upload.single('audioBlob'), (req, res) => {
	console.log(req.file);
	const uploadLocation = __dirname + '/audio/' + req.file.originalname;
	fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));
	res.sendStatus(200);
});

app.listen(process.env.PORT || 9000);
