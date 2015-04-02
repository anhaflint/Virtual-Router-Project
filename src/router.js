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



if(args[0] === 'client') {
	var machine = new Machine('client');
} else if (args[0] === 'router') {
	var machine = new Machine('router');
} else {
	console.log("Please specify machine mode");
}

crawler.ask(machine);