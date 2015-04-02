/**
 * Source file for hello message
 */

var Join 	= require('./Join');
var inherits 	= require('util').inherits;

function Prune(type, src, dest, groupID) {
	Join.call(this, type, src, dest, groupID);
}

inherits(Prune, Join);

module.exports = Prune;


