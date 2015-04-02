/**
 * Source file for datagramm header
 */

module.exports = function Header() {
	this.type = null;
	this.src = null;
	this.dest = null;

	this.setType = function(type) {
		it(typeof type !== 'undefined' && type >= 0 && type <= 2) {
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
}