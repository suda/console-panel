import { CompositeDisposable } from 'atom';
import ConsoleManager from './console-manager';
import ConsoleView from './console-view';
import packageConfig from './config/config-schema.json';

export default {
  config: packageConfig,

  consoleView: null,
  subscriptions: null,

  activate() {
    this.consoleView = new ConsoleView();
    this.consoleManager = new ConsoleManager(this.consoleView);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'console:toggle': () => this.consoleManager.toggle(),
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
      priority: 600,
    });
  },
};
