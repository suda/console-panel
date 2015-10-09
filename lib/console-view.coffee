{View} = require 'atom-space-pen-views'
$ = null
$$ = null

module.exports =
class ConsoleView extends View
  @content: ->
    @div id: 'atom-console', class: 'view-resizer panel', =>
      @div class: 'view-resize-handle', outlet: 'resizeHandle'
      @div class: 'panel-heading', dblclick: 'toggle', outlet: 'heading', 'Console', =>
        @button class: 'btn pull-right', click: 'clear', 'Clear'
      @div class: 'panel-body closed view-scroller', outlet: 'body', =>
        @pre outlet: 'output'

  initialize: (serializeState) ->
    {$, $$} = require 'atom-space-pen-views'

    @body.height serializeState?.height
    atom.workspace.addBottomPanel(item: @element, priority: 100)
    @handleEvents()

  # Returns an object that can be retrieved when package is activated
  serialize: ->
    height: @body.height

  # Tear down any state and detach
  destroy: ->
    @disposables?.dispose()

  show: ->
    @body.removeClass 'closed'

  hide: ->
    @body.addClass 'closed'

  toggle: ->
    if @body.hasClass 'closed'
      @show()
    else
      @hide()

  log: (message, level) ->
    at_bottom = (@body.scrollTop() + @body.innerHeight() + 10 > @body[0].scrollHeight)

    if typeof message == 'string'
      @output.append $$ ->
        @p class: 'level-' + level, message
    else
      @output.append message

    if at_bottom
      @body.scrollTop(@body[0].scrollHeight)

    @show()

  clear: ->
    @output.empty()
    @hide()

  handleEvents: ->
    @on 'dblclick', '.view-resize-handle', =>
      @resizeToFitContent()

    @on 'mousedown', '.view-resize-handle', (e) => @resizeStarted(e)

  resizeStarted: =>
    $(document).on('mousemove', @resizeView)
    $(document).on('mouseup', @resizeStopped)

  resizeStopped: =>
    $(document).off('mousemove', @resizeView)
    $(document).off('mouseup', @resizeStopped)

  resizeView: ({which, pageY}) =>
    return @resizeStopped() unless which is 1
    @body.height($(document.body).height() - pageY - @heading.outerHeight())

  resizeToFitContent: ->
    @body.height(1) # Shrink to measure the minimum width of list
    @body.height(@body.find('>').outerHeight())
