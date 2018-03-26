let express = require('express');
let fs = require('fs');
let app = express();
let bodyParser = require('body-parser');

app.use(express.static(__dirname + "/web"));
app.use(bodyParser.urlencoded());
// app.get('/', function (req, res) {
// 	res.send('Hello World');
// });
app.get('/score', function (req, res) {
	fs.readFile('bestScore.json', (err, data) => {
		if (err)
			res.send({});
		else {
			let score = JSON.parse(data);

			res.send(score);
		}
	});
});
app.post('/score', function (req, res) {
	fs.readFile('bestScore.json', (err, data) => {
		if (err)
			res.send({});
		else {
			let score = JSON.parse(data);
			score[req.body.name] = req.body.score;
			fs.writeFile('bestScore.json', JSON.stringify(score));
			res.send(score);
		}
	});
	console.log(req.body);
})
app.listen(3000);