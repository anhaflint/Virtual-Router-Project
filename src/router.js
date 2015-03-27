#!/user/bin/env node

/**
 * router.js
 * files for the router
 */

var net = require('net');
var args = process.argv.slice(2);



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
	// instantiate new router machine
	var server = net.createServer(function(c) {
		c.on('data', function(data) {
			console.log('data ' + c.remoteAddress + ' : ' + data);
			c.write("you said " + data) ;
		});
	}); 
	server.listen(8124, function() {
		console.log('server bound');
	});
}