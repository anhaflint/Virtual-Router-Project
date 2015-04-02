/**
 * Source file for datagramm header
 */

module.exports = function Header(type, src, dest) {
	this.type = type;
	this.src = src;
	this.dest = dest;

	this.setType = function(type) {
		if(typeof type !== 'undefined' && type >= 0 && type <= 2) {
			this.type = type;
		}
	}

	this.setSRC = function(src) {
		if (typeof src !== 'undefined') {
			this.src = src;
		}
	}

	this.setDest = function(dest) {
		if(typeof dest !== 'undefined') {
			this.dest = dest;
		}
	}

	this.toString = function() {
		return this.type + '-' + this.src + '-' + this.dest;
	}
}