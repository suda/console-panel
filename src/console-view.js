import {$$, View} from 'atom-space-pen-views';

export default class ConsoleView extends View {
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
		return `atom://console-panel/${this.getPath()}`;
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
			this.output.append($$(function() {
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
