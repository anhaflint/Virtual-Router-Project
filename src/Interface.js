var net = require('net');

//Constructeur de la classe Interface
module.exports = function Interface(name, ip) {
	this.name = name;
	this.ip = "";
	this.server = null;
	this.mode = "down";
	this.listen = "";
	this.socket = new net.Socket({
			readable: true,
			writable: true
		});
	

	this.setIP = function(ip) {
		this.ip = ip;
		console.log("IP set for " + this.name + " is : " + this.ip);
	}

	this.flushIP = function() {
		this.ip = "";
	}

	this.set = function (mode) {
		this.mode = mode ;
	}

	this.setListen = function(ip) {
		this.listen = ip;
		this.print();
	}

	this.print = function() {
		console.log(
			'{ \n name : '
			+ this.name
			+ '\n'
			+ ' ip : '
			+ this.ip
			+ '\n'
			+ ' listening to : '
			+ this.listen
			+ '\n'
			+ ' mode : ' 
			+ this.mode
			+ '\n}'
			)
	}


	if (typeof ip !== 'undefined') 
	{
		this.setIP(ip);
		this.server = net.createServer(function(c) {
			c.on('data', function(data) {
				console.log('data ' + c.remoteAddress + ' : ' + data);
			});
		}); 
		this.server.listen(this.ip, function() {
		});
		this.set("up");
	}
}
