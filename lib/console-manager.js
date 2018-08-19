'use babel';

let Emitter = null;

export default class ConsoleManager {
	constructor(view) {
		this.view = view;
		({Emitter} = require('event-kit'));

		this.emitter = new Emitter;
	}

	destroy() {
		this.emitter.dispose();
	}

	// Toggle console panel
	toggle() {
		this.view.toggle();
	}

  // Show console panel
	show() {
		this.view.show();
	}

  // Hide console panel
  show() {
    this.view.hide();
  }

  stickBottom() {
    console.log(this.view.output)
  }

  stickTop() {

  }

	// Log message with default level
	log(message, level, toggle) {
		if (level == null) { level = 'info'; }
    if (toggle == null) { toggle = true}
		this.view.log(message, level, toggle);
	}

	// Log error
	error(message) {
		this.log(message, 'error');
	}

	// Log warning
	warn(message) {
		this.log(message, 'warn');
	}

	// Log notice
	notice(message) {
		this.log(message, 'notice');
	}

	// Log debug message
	debug(message) {
		this.log(message, 'debug');
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
	clear(toggle) {
    if (toggle == null) { toggle = true}
		this.view.clear(toggle);
	}
};
