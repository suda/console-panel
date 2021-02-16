import { Emitter } from 'event-kit';

export default class ConsoleManager {
  constructor(view) {
    this.view = view;
    this.emitter = new Emitter();
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
      lineEnding = '\n';
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
