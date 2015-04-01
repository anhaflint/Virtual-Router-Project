//Constructeur de la classe Interface
module.exports = function Interface(nom) {
	this.nom = nom;
	this.ip = "";
	this.mode = "down";
	console.log("nouvelle interface créée");

	this.setIP = function(ip) {
		this.ip = ip;
		console.log("IP set for " + this.nom + " is : " + this.ip);
	}

	this.flushIP = function() {
		this.ip = "";
	}

	this.setUP = function () {
		this.mode = "up" ;
	}

	this.setDown = function() {
		this.mode = "down";
	}

}
