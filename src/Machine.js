//Constructeur de la classe Machine
var Interface = require('./Interface.js');
var net = require('net');

module.exports = function Machine() {
	this.mode = "client";
	this.name = "";
	this.interfaces = [];
	this.tabAddr = [];
	this.socket = this.socket = new net.Socket({
			readable: true,
			writable: true
		});

	this.setName = function(name) {
		this.name = name;
	}

	this.addInterface = function(name, ip) {
		if(typeof ip !== 'undefined') {
			this.interfaces.push(new Interface(name, ip));
		}
		this.printInterfaces();
	}

	this.getInterface = function(name) {
		for(var i in this.interfaces) {
			if(this.interfaces[i].name == name) 
			{
				return this.interfaces[i];
			} 
		}
		console.log('ERROR : interface does not exist');
		this.printInterfaces();
	}

	this.printInterfaces = function() {
		for(var i in this.interfaces) 
		{
			this.interfaces[i].print();
		}
	}

	this.setRouter = function() {
		this.mode = "router";
	}

	this.setClient = function() {
		this.mode = "client";
	}

	this.connect = function(ip, message) {
		this.socket.connect(ip);
		console.log(message);
		if(typeof message !== 'undefined') {
			this.socket.write(message);
		}
	}
}
