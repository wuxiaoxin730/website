var express = require('express');
var handlebars = require('express3-handlebars').create({
	defaultLayout: 'main',
	extname: '.html',
	helpers: {
	section: function(name, options){
		if(!this._sections) this._sections = {};

		console.log('%s', "This is a section function in helpers object");

		console.log('%s', "Its name is " + name);

		console.dir(options);

		console.dir(this._sections);

		this._sections[name] = options.fn(this);


		return name + ' Section is Here!!!!';
	}
}
});
var fortune = require('./fortunes.js');

var app = express();
var admin = express();

admin.get('/', function(req,res){
	console.log(admin.mountpath);
	res.send('Admin Home');
});

admin.on('mount', function(parent){
	console.log('Admin Mount');
	//console.dir(parent);
});

app.engine('html', handlebars.engine);

app.set('view engine', 'html');

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
	console.dir('Request Body:' + req.body);
	console.dir('Request Query:' + req.query);
	console.dir('Request Params:' + req.params);

	var headers = [];

	for(var name in req.headers) {
		headers.push({name: name, value: req.headers[name]});
	}

	res.render('headers', {headers: headers});
});

app.get('/toJson/:id', function(req, res){
	console.dir('Query: ' + req.query);
	console.dir('Params: ' + req.params);
	console.dir(req.route);
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
