/**
 * Source file for hello message
 */

var Message 	= require('./Message');
var inherits 	= require('util').inherits;

function Hello(type, src, dest) {
	Message.call(this, type, src, dest);
	this.data = "30";
}

inherits(Hello, Message);

module.exports = Hello;


