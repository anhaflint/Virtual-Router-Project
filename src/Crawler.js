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
							console.log('ERROR : name is blank -- "type help to display the help section"');
						}
						break;
					case "interface" : 
						if(typeof data[1] !== 'undefined' && typeof data[2] === 'undefined') 
						{
							machine.addInterface(data[1]);
						} else if(typeof data[2] !== 'undefined') { 
							machine.addInterface(data[1], data[2]);
						} else {
							console.log('ERROR : name is blank -- "type help to display the help section"');
						}
						break;
					case "set":
						if(data[1] !== 'undefined' && data[2] !== 'undefined') 
						{
							machine.getInterface(data[1]).set(data[2]);
						}
					case "mode" : 
						if(data[2] === '-router') 
						{
							machine.setRouter();
						} else {
							machine.setClient();
						}
						break;
					case "ping" :
						if(typeof data[1] !== 'undefined') 
						{
							if(typeof data[2] === 'undefined') 
							{
								machine.connect(parseInt(data[1]), "ping");
							} else {
								machine.connect(parseInt(data[1]), data[2]);
							}
						}
						break;
					case "help" :
						console.log(
							'\n\n\n------------------------------------------------------------------'
							+ '\nthis is a simple command line interface for nodejs Virtual Router'
							+ '\n------------------------------------------------------------------'
							+ '\n use : '
							+ '\n   mode -router to set the machine as a router' 
							+ '\n   mode -client to set the machine as a client'
							+ '\n   setName to set the name of the machine'
							+ '\n   interface <name> <ip> to set a new interface named <name> with the given ip address' 
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