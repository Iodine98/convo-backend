// const createDirectory = (path) => {
// 	const fullPath = __dirname + `/${path}`;
// 	fs.stat(fullPath, ((err, stats) => {
// 		if (err) {
// 			console.error(err);
// 		} else if (!stats.isDirectory()) {
// 			fs.mkdir(fullPath, error => {
// 				if (error) {
// 					console.error(error)
// 				} else {
// 					console.log(fullPath + " directory has been created.");
// 				}
// 			})
// 		} else {
// 			console.log(fullPath + " is an existing directory.");
// 		}
// 	}))
// }
