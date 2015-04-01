//Constructeur de la classe Machine
var Interface = require('./Interface.js');

module.exports = function Machine() {
	this.mode = "client";
	this.nom = "";
	this.interfaces = [];
	this.tabAddr = [];

	this.setNom = function(nom) {
		this.nom = nom;
	}

	this.addInterface = function(nom) {
		this.interfaces.push(new Interface(nom));
	}

	this.setRouter = function() {
		this.mode = "router";
	}

}
