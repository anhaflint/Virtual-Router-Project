/**
 * Source file for hello message
 */

var Message 	= require('./Message');
var inherits 	= require('util').inherits;

function Join(type, src, dest, groupID) {
	Message.call(this, type, src, dest);
	this.data = groupID;
}

inherits(Join, Message);

module.exports = Join;


