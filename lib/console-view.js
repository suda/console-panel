'use babel';

const {View} = require('atom-space-pen-views');
let $ = null;
let $$ = null;

export default class ConsoleView extends View {
	static content() {
		return this.div({id: 'atom-console', class: 'view-resizer panel'}, () => {
			this.div({class: 'view-resize-handle', outlet: 'resizeHandle'});
			this.div({class: 'panel-heading', dblclick: 'toggle', outlet: 'heading'}, 'Console', () => {
				return this.button({class: 'btn pull-right', click: 'clear'}, 'Clear');
			});
			return this.div({class: 'panel-body closed view-scroller', outlet: 'body'}, () => {
				return this.pre({class: 'native-key-bindings', outlet: 'output', tabindex: -1});
			});
		});
	}

	initialize(serializeState) {
		({$, $$} = require('atom-space-pen-views'));

		this.resizeStarted = this.resizeStarted.bind(this);
		this.resizeStopped = this.resizeStopped.bind(this);
		this.resizeView = this.resizeView.bind(this);

		this.body.height(serializeState != null ? serializeState.height : undefined);
		atom.workspace.addBottomPanel({item: this.element, priority: 100});
		return this.handleEvents();
	}

	// Returns an object that can be retrieved when package is activated
	serialize() {
		return {height: this.body.height};
	}

	// Tear down any state and detach
	destroy() {
		return (this.disposables != null ? this.disposables.dispose() : undefined);
	}

	show() {
		return this.body.removeClass('closed');
	}

	hide() {
		return this.body.addClass('closed');
	}

	toggle() {
		if (this.body.hasClass('closed')) {
			return this.show();
		} else {
			return this.hide();
		}
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

	handleEvents() {
		this.on('dblclick', '.view-resize-handle', () => {
			return this.resizeToFitContent();
		});

		return this.on('mousedown', '.view-resize-handle', e => this.resizeStarted(e));
	}

	resizeStarted() {
		$(document).on('mousemove', this.resizeView);
		return $(document).on('mouseup', this.resizeStopped);
	}

	resizeStopped() {
		$(document).off('mousemove', this.resizeView);
		return $(document).off('mouseup', this.resizeStopped);
	}

	resizeView({which, pageY}) {
		if (which !== 1) { return this.resizeStopped(); }
		return this.body.height($(document.body).height() - pageY - this.heading.outerHeight());
	}

	resizeToFitContent() {
		this.body.height(1); // Shrink to measure the minimum width of list
		return this.body.height(this.body.find('>').outerHeight());
	}
};
