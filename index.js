var express = require('express');
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
var fortune = require('./fortunes.js');

var app = express();
var admin = express();

admin.get('/', function(req,res){
	console.log(admin.mountpath);
	res.send('Admin Home');
});

admin.on('mount', function(parent){
	console.log('Admin Mount');
	console.log(parent);
});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
	res.type('text/plain');
	res.send('Hello Express Framework!');
});

app.get('/about', function(req, res){
	console.log(app.locals.title);
	console.log(app.locals.email);
	res.render('about', {fortune : fortune.getfortune()});
});

app.get('/headers', function(req, res){
	var s = '';

	console.log('Request Body:' + req.body);
	console.log('Request Query:' + req.query);
	console.log('Request Params:' + req.params);

	res.type('text/plain');

	for(var name in req.headers) {
		s += name + ' : ' + req.headers[name] + '\n';
	}

	res.send(s);
});

app.get('/toJson/:id', function(req, res){
	console.log('Query x: ' + req.query.x);
	console.log('Params id: ' + req.params.id);
	console.log(req.route);
	console.log(req.ip);
	console.log('hostname:' + req.hostname);
	console.log('path:' + req.path);

	res.status(200).json(req.query);
});

app.use('/admin', admin);

app.use(express.static(__dirname + '/public'));

//Customize 404 page
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

//Customize 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

var test = function(){
	alert(123);
};