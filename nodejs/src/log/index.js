class Log {
	constructor(type) {
		this.type = type;
	}

	text(text) {
		if (this.type == true) {
			console.log(text);
		} else {
			console.log('Logger disabled');
		}
	}
}

module.exports = Log;
