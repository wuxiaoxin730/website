var fortunes = [
	"PHP",
	"Java",
	"C#",
	".NET",
	"PYTHON",
	"RUBY",
	"C",
	"C++",
	"VB",
	"Javascript",
	"Typescript",
	"XML",
	"YML",
	"WSDL",
	"SHELL script",
	"SQL"
];

exports.getfortune = function(){
	return fortunes[Math.floor(Math.random() * fortunes.length)];
};