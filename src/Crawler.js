//functions

process.stdin.resume();
process.stdin.setEncoding('utf8');

module.exports = {

	ask: function (machine) 
	{
		var stdin = process.stdin, stdout = process.stdout;

		stdin.resume();
		if(machine.name === "") 
		{
			stdout.write("machine $");
		} else {
			stdout.write(machine.name + " $");
		}
		stdin.once('data', function(data) {
			data = data.toString().trim().split(" ");
			if (data === "quit") 
			{
				process.exit();
			} else {
				switch(data[0]) 
				{
					case "setName" :
						if(typeof data[1] !== 'undefined') 
						{
							machine.setName(data[1]);
						} else {
							console.log('ERROR : name is blank -- type help to display the help section');
						}
						break;
					case "int" : 
						if(typeof data[1] !== 'undefined' && typeof data[2] !== 'undefined') { 
							machine.addInterface(data[1], data[2], machine);
						} else {
							console.log('ERROR : name is blank -- type help to display the help section');
						}
						break;
					case "set":
						if(typeof data[1] !== 'undefined' && typeof data[2] !== 'undefined') 
						{
							if(data[1] === "up" || data[1] === "down") {
								machine.getInterfaceN(data[1]).set(data[2]);
							} else if (data[1] === "int" && data[2] !== 'undefined' && data[3] !== 'undefined') {
								machine.getInterfaceN(data[2]).setIP(data[3]);
							} else if (data[1] === "rp") {
								machine.setRP();
							}
						}
						break;
					//setListen <interface> <ip>
					case "setListen" :
						if(typeof data[1] !== 'undefined' && typeof data[2] !== 'undefined') {
							//Check this interface
							var interface = machine.getInterfaceN(data[1]);
							//Check the other interfaces
							var otherInterface = machine.getInterfaceI(data[2]);
							if(interface.ip !== data[2] && otherInterface === null) {
								interface.setListen(data[2]);
							} else {
								console.log("You are trying to connect the interface to itself");
							}
						}
						break;
					case "routes" :
						console.log(machine.neighTable);
						break;
					case "mode" : 
						if(data[2] === '-router') 
						{
							machine.setRouter();
						} else if(data[2] === '-client'){
							machine.setClient();
						}
						break;
					//ping <ip> <message>
					case "ping" :
						if(typeof data[1] !== 'undefined') 
						{	
							//Find the interface listening to the ip address
							if(typeof data[2] === 'undefined') 
							{
								machine.connect(parseInt(data[1]), "ping");
							} else {
								machine.connect(parseInt(data[1]), data[2]);
							}
						}
						break;
					case "status" :
						machine.print();
						break;
					case "help" :
						console.log(
							'\n\n\n------------------------------------------------------------------'
							+ '\nthis is a simple command line interface for nodejs Virtual Router'
							+ '\n------------------------------------------------------------------'
							+ '\n use : '
							+ '\n type quit to exit'
							+ '\n   mode -router to set the machine as a router' 
							+ '\n   mode -client to set the machine as a client'
							+ '\n   setName to set the name of the machine'
							+ '\n   setListen <interface name> <ip> to set the distant ip address'
							+ '\n   int <name> <ip> to set a new interface named <name>'
							+ '\n       with the given ip address' 
							+ '\n   set int <interface name> <ip> to set new ip'
							+ '\n\n\n'
						);
						break;
					case "quit" :
						process.exit();
						break;
					default :
						break;
				}
				module.exports.ask(machine);	
			}
		});
	}
}