Emitter = null

module.exports =
	class ConsoleManager
		constructor: (@view) ->
			{Emitter} = require 'event-kit'

			@emitter = new Emitter

		destroy: ->
			@emitter.dispose()

		# Toggle console panel
		toggle: ->
			@view.toggle()

		# Log message with default level
		log: (message, level='info') ->
			@view.log message, level

		# Log error
		error: (message) ->
			@log message, 'error'

		# Log warning
		warn: (message) ->
			@log message, 'warn'

		# Log notice
		notice: (message) ->
			@log message, 'notice'

		# Log debug message
		debug: (message) ->
			@log message, 'debug'

		# Log raw text
		raw: (rawText, level='info', lineEnding="\n") ->
			for line in rawText.split(lineEnding)
				@log line, level

		# Clear console panel
		clear: ->
			@view.clear()
