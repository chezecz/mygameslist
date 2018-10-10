var express = require("express");
var parser = require("body-parser");
var app =  express();
var port = 3002;

var outReq = require("request");


app.use(express.static('/root/deze_my_games_list/'));

app.use((err, request, response, next) => {
	console.log(err);
	response.status(500).send("It does not work");
});

app.use(parser.urlencoded({extended: true}));

app.get('/:what/:ver/:item', (request, response) => {
	console.log(request.params);
	reqUrl = "https://canvas.sydney.edu.au/" + request.params.what +"/" + request.params.ver +"/"+ request.params.item;
	outReq(reqUrl, (err, res, body) => {
		console.log(body);
		response.send(body);
	});
	//response.send(request.params);
	
});

app.get('/:any/:againany', (request, response) => {
	console.log(request.params);
	response.send(request.params);
	
});

app.get('/index', (request, response) => {
	response.sendFile('/root/deze_my_games_list/index.html');
	
});
app.get('/', (request, response) => {
	response.sendFile('/root/deze_my_games_list/index.html');
	
});

app.get('/user', (request, response) => {
	response.sendFile('/root/deze_my_games_list/user.html');
	
});

app.get('/game_desc', (request, response) => {
	response.sendFile('/root/deze_my_games_list/game_desc.html');
	
});
app.get('/styles.css', (request, response) => {
	response.sendFile('/root/deze_my_games_list/style.css');
	
});

app.get('/assets/:name', (request, response) => {
	var path = request.params.name
	response.sendFile(path);
	
});

app.listen(port, (err) => {
	if(err) {
		return console.log('error on listening', err);
	}
	console.log(`server is listening on ${port}`);
});