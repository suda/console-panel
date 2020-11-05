'use strict';

var atom$1 = require('atom');
var eventKit = require('event-kit');
var atomSpacePenViews = require('atom-space-pen-views');

class ConsoleManager {
	constructor(view) {
		this.view = view;
		this.emitter = new eventKit.Emitter;
	}

	destroy() {
		this.emitter.dispose();
	}

	// Toggle console panel
	toggle() {
		this.view.toggle();
	}

  stickBottom() {
    this.view.stickTop = false;
  }

  stickTop() {
    this.view.stickTop = true;
  }

	// Log message with default level
	log(message, level = 'info') {
		this.view.log(message, level);
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
		if (level === null) {
			level = 'info';
		}
		if (lineEnding === null) {
			lineEnding = "\n";
		}
		rawText.split(lineEnding).forEach((line) => {
			this.log(line, level);
		});
	}

	// Clear console panel
	clear() {
		this.view.clear();
	}
}

class ConsoleView extends atomSpacePenViews.View {
	static content() {
		this.div({id: 'atom-console'}, () => {
			this.div({class: 'panel-body view-scroller', outlet: 'body'}, () => {
				this.pre({class: 'native-key-bindings', outlet: 'output', tabindex: -1});
			});
		});
	}

	// Tear down any state and detach
	destroy() {
		if (this.disposables !== null) {
			this.disposables.dispose();
		}
	}

	getTitle() {
		return 'Console';
	}

	getPath() {
		return 'console';
	}

	getUri() {
		return `particle-dev://editor/${this.getPath()}`;
	}

	getDefaultLocation() {
		return 'bottom';
	}

	show() {
		atom.workspace.open(this, {activatePane: false});
		atom.workspace.getBottomDock().show();
	}

	hide() {
		atom.workspace.getBottomDock().hide();
	}

	toggle() {
		atom.workspace.toggle(this);
	}

	log(message, level) {
		const at_bottom = ((this.body.scrollTop() + this.body.innerHeight() + 10) > this.body[0].scrollHeight);

		if (typeof message === 'string') {
			this.output.append(atomSpacePenViews.$$(function() {
				this.p({class: `level-${level}`}, message);
			})
			);
		} else {
			this.output.append(message);
		}

		if (at_bottom && !this.stickTop) {
			this.body.scrollTop(this.body[0].scrollHeight);
		} else if (this.stickTop) {
      this.body.scrollTop(0);
    }
		if(atom.config.get('console-panel.show') === true ){			
			this.show();
		}
	}

	clear() {
		this.output.empty();
		this.hide();
	}
}

var show = {
	description: "Show console panel when logs are added",
	type: "boolean",
	"default": true
};
var packageConfig = {
	show: show
};

var console = {
	config: packageConfig,

	consoleView: null,
	subscriptions: null,

	activate() {
		this.consoleView = new ConsoleView();
		this.consoleManager = new ConsoleManager(this.consoleView);

		// Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
		this.subscriptions = new atom$1.CompositeDisposable;

		// Register command that toggles this view
		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'console:toggle': () => this.consoleManager.toggle()
			})
		);
	},

	deactivate() {
		this.subscriptions.dispose();
		this.consoleView.destroy();
	},

	provideConsolePanel() {
		return this.consoleManager;
	},

	consumeToolBar(toolBar) {
		this.toolBar = toolBar('console-tool-bar');

		this.toolBar.addButton({
			icon: 'align-left',
			iconset: 'fi',
			tooltip: 'Toggle Console',
			callback: 'console:toggle',
			priority: 600
		});
	}
};

module.exports = console;
//# sourceMappingURL=console.js.map
