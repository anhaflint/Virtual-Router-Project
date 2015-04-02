/**
 * Source file for hello message
 */

var Header = require('./Header');

module.exports = function Message(type, src, dest) {
	this.header = new Header(type, src, dest);
	this.data = "";

	this.toString = function() {
		return this.header.toString() + '-' + this.data;
	}
}
