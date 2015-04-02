/**
 * Source file for hello message
 */

var Message 	= require('./Message');
var inherits 	= require('util').inherits;

function Multicast(type, src, dest, message) {
	Message.call(this, type, src, dest);
	this.data = message;
}

inherits(Multicast, Message);

module.exports = Multicast;


