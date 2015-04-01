#!/user/bin/env node

/**
 * router.js
 * files for the router
 */
//modules
var net = require('net');
var Machine = require('./Machine');
var crawler = require('./Crawler');

var args = process.argv.slice(2);

var machine = new Machine();
crawler.ask(machine);

if(args[0] === 'client') {
	machine.setClient();
} else if (args[0] === 'router') {
	machine.setRouter();
}
