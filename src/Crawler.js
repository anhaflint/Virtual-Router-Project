//functions

process.stdin.resume();
process.stdin.setEncoding('utf8');

module.exports = {
	ask: function () {
		var stdin = process.stdin, stdout = process.stdout;

		stdin.resume();
		stdout.write("routeur $");

		stdin.once('data', function(data) {
			data = data.toString().trim();

			if (data === "quit") {
				process.exit();
			} else {
				stdout.write("you said : \n" + data + "\n");
				module.exports.ask();	
			}
		});
	}

	
}