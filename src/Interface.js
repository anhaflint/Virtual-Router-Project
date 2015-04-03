var net = require('net');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

//Constructeur de la classe Interface
module.exports = function Interface(name, ip, machine) {
	this.machine = machine;
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
		this.machine.helloMessage(this);
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
				var message = decoder.write(data).split("-");
				if(message[0] == '0') {
					machine.receiveHello(message.splice(0));
				} else {
					console.log("data : " + message.join("-"));
				}
			});
		}); 
		this.server.listen(this.ip, function() {
		});
		this.set("up");
	}
}
