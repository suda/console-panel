'use babel';

let Emitter = null;

export default class ConsoleManager {
	constructor(view) {
		this.view = view;
		({Emitter} = require('event-kit'));

		this.emitter = new Emitter;
	}

	destroy() {
		return this.emitter.dispose();
	}

	// Toggle console panel
	toggle() {
		return this.view.toggle();
	}

	// Log message with default level
	log(message, level) {
		if (level == null) { level = 'info'; }
		return this.view.log(message, level);
	}

	// Log error
	error(message) {
		return this.log(message, 'error');
	}

	// Log warning
	warn(message) {
		return this.log(message, 'warn');
	}

	// Log notice
	notice(message) {
		return this.log(message, 'notice');
	}

	// Log debug message
	debug(message) {
		return this.log(message, 'debug');
	}

	// Log raw text
	raw(rawText, level, lineEnding) {
		if (level == null) {
			level = 'info';
		}
		if (lineEnding == null) {
			lineEnding = "\n";
		}
		rawText.split(lineEnding).forEach((line) => {
			this.log(line, level);
		});
	}

	// Clear console panel
	clear() {
		return this.view.clear();
	}
};
