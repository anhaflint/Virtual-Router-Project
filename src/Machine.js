//Constructeur de la classe Machine
var Interface = require('./Interface.js');
var net = require('net');

module.exports = function Machine() {
	this.mode = "client";
	this.name = "";
	this.interfaces = [];
	this.tabAddr = [];
	

	this.setName = function(name) {
		this.name = name;
	}

	this.addInterface = function(name, ip) {
		if(typeof ip !== 'undefined') {
			this.interfaces.push(new Interface(name, ip));
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
		this.mode = "router";
	}

	this.setClient = function() {
		this.mode = "client";
	}

	this.connect = function(ip, message) {
		var interface = this.getListenerInterface(ip);
		if(interface !== null) {
			interface.socket.connect(ip);
			if(typeof message !== 'undefined') {
				interface.socket.write(message);
			}
		} else {
			console.log('Failed to ping - please check the connexion');
		}
	}
}
