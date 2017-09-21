'use babel';

const {View} = require('atom-space-pen-views');
let $ = null;
let $$ = null;
let packageName = null;

export default class ConsoleView extends View {
	static content() {
		return this.div({id: 'atom-console'}, () => {
			return this.div({class: 'panel-body view-scroller', outlet: 'body'}, () => {
				return this.pre({class: 'native-key-bindings', outlet: 'output', tabindex: -1});
			});
		});
	}

	initialize(serializeState) {
		({$, $$} = require('atom-space-pen-views'));
		({packageName} = require('./util/package-helper'));

		this.dockItem = {
			element: this.element,
			getTitle: () => 'Console',
			getURI: () => `atom://${packageName()}/console`,
			getDefaultLocation: () => 'bottom'
		};
	}

	// Returns an object that can be retrieved when package is activated
	serialize() {
	}

	// Tear down any state and detach
	destroy() {
		return (this.disposables != null ? this.disposables.dispose() : undefined);
	}

	show() {
		atom.workspace.open(this.dockItem);
	}

	hide() {
		atom.workspace.getBottomDock().hide();
	}

	toggle() {
		atom.workspace.toggle(this.dockItem);
	}

	log(message, level) {
		const at_bottom = ((this.body.scrollTop() + this.body.innerHeight() + 10) > this.body[0].scrollHeight);

		if (typeof message === 'string') {
			this.output.append($$(function() {
				return this.p({class: `level-${level}`}, message);
			})
			);
		} else {
			this.output.append(message);
		}

		if (at_bottom) {
			this.body.scrollTop(this.body[0].scrollHeight);
		}

		return this.show();
	}

	clear() {
		this.output.empty();
		return this.hide();
	}
};
