ConsoleView = require './console-view'
ConsoleManager = require './console-manager'
{CompositeDisposable} = require 'atom'

module.exports = Console =
  consoleView: null
  subscriptions: null

  activate: (state) ->
    @consoleView = new ConsoleView(state.consoleViewState)
    @consoleManager = new ConsoleManager(@consoleView)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'console:toggle': =>
      @consoleManager.toggle()

  deactivate: ->
    @subscriptions.dispose()
    @consoleView.destroy()

  serialize: ->
    consoleViewState: @consoleView.serialize()

  provideConsolePanel: ->
    @consoleManager

  consumeToolBar: (toolBar) ->
    @toolBar = toolBar 'console-tool-bar'

    @toolBar.addButton
      icon: 'align-left'
      iconset: 'fi'
      tooltip: 'Toggle Console'
      callback: 'console:toggle'
