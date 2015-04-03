//Constructeur de la classe Machine
var Interface = require('./Interface.js');
var net = require('net');
var Hello = require('./Hello');

module.exports = function Machine(mode) {
	this.mode = mode;
	this.name = 'machine';
	this.interfaces = [];
	this.routingTable = [];
	this.neighTable = [];
	this.rp = false;

	this.print = function() {
		console.log(
			'{ \n name : '
			+ this.name
			+ '\n'
			+ ' rp : '
			+ this.rp
			+ '\n'
			+ ' mode : ' 
			+ this.mode
			+ '\n}'
			);
		console.log(' interfaces : ');
		this.printInterfaces();
	}

	this.setName = function(name) {
		this.name = name;
	}

	this.addInterface = function(name, ip, machine) {
		if(typeof ip !== 'undefined') {
			this.interfaces.push(new Interface(name, ip, machine));
		}
		this.printInterfaces();
	}

	this.getInterfaceN = function(name) {
		for(var i in this.interfaces) {
			if(this.interfaces[i].name == name) 
			{
				return this.interfaces[i];
			} 
		}
		return null;
	}

	this.setRP = function() {
		if(this.mode == 'router') {
			this.rp = true;
		}
	}

	this.getInterfaceI = function(ip) {
		for(var i in this.interfaces) {
			if(this.interfaces[i].ip === ip) {
				return this.interfaces[i];
			}
		}
		return null;
	}

	this.getListenerInterface = function(ip) {
		for(var i in this.interfaces) {
			if(this.interfaces[i].listen == ip) {
				return this.interfaces[i];
			}
		}
		return null;
	}

	this.printInterfaces = function() {
		for(var i in this.interfaces) 
		{
			this.interfaces[i].print();
		}
	}

	this.setRouter = function() {
		this.mode = 'router';
	}

	this.setClient = function() {
		this.mode = 'client';
	}

	this.connect = function(ip, message) {
		var interface = this.getInterfaceI(this.searchTable(ip));
		if(interface !== null) {
			interface.socket.connect(ip);
			if(typeof message !== 'undefined') {
				interface.socket.write(message);
			}
		} else {
			console.log('Failed to ping - please check the connexion');
		}
	}

	this.searchTable = function(ip) {
		for(var i in this.neighTable) {
			if(this.neighTable[i][0] == ip) {
				return this.neighTable[i][1];
			}
		}
		return null;
	}

	this.helloMessage = function(interface) {
		console.log("Discovering network...");
		var neighbor = [interface.listen, interface.ip];
		var message = new Hello( 0, interface.ip, interface.listen);

		this.neighTable.push(neighbor);
		console.log(this.neighTable);
		this.connect(interface.listen, message.toString());
	}

	this.receiveHello = function(message) {
		//[dest, src]
		var newNeighbor = [message[1], message[2]];
		this.getInterfaceI(message[2]).listen = message[1];
		if(message[1] !== 'undefined') {
			this.neighTable.push(newNeighbor);
		}
		for(var i in this.neighTable) {
			if(message[1] !== this.neighTable[i][0] && this.getListenerInterface(this.neighTable[i][0]) !== null) {
				var message = new Hello(0, message[1], this.neighTable[i][0]);
				this.connect(this.neighTable[i][0], message.toString());
			}
		}
		console.log(this.neighTable);
	}
}
