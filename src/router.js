#!/user/bin/env node

/**
 * router.js
 * files for the router
 */
//modules
var net = require('net');
var Machine = require('./Machine');
var crawler = require('./Crawler');

var args = process.argv.slice(2);

var machine = new Machine();
crawler.ask();

if(args[0] === 'client') {
	// instantiate new client machine
	var socket = new net.Socket({
			readable: true,
			writable: true
		});
	socket.connect(8124);
	if(typeof args[1] !== 'undefined') {
		socket.write(args[1]);
	}
} else if (args[0] === 'router') {
	machine.setRouter();
	// instantiate new router machine
	var server = net.createServer(function(c) {
		c.on('data', function(data) {
			console.log('data ' + c.remoteAddress + ' : ' + data);
			c.write("you said " + data) ;
		});
	}); 
	server.listen(8124, function() {
		
	});
}


