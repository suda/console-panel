# Atom Console package

**This isn't a terminal**. It's only a log console. Great for showing compilation output, long responses or general logs.

![Screenshot](https://github.com/spark/console-panel/raw/master/resources/screenshot.png)

## Usage

By itself, the package doesn't do anything but it provides a service other packages can consume:

`package.json`
```json
"consumedServices": {
  "console-panel": {
    "versions": {
      "^1.0.0": "consumeConsolePanel"
    }
  }
}
```

`main.coffee`
```coffeescript
consumeConsolePanel: (@consolePanel) ->

log: (message) ->
	@consolePanel.log(message)
```

## API reference

When consuming console panel you'll get an instance of `ConsoleManager` which has the following methods:

###### toggle()
Toggles the console panel.

###### show()
Shows the console panel.

###### hide()
Hides the console panel.

###### log(message, level='info', toggle='true')
Logs a message. `message` can be a `String` or a custom `View` that will be appended.
When toggle is set to true, the console will be shown.

###### error(message)
Logs an error.

###### warn(message)
Logs a warning.

###### notice(message)
Logs a notice.

###### debug(message)
Logs an debug message.

###### raw(rawText, level='info', lineEnding="\n")
Logs a raw message. `rawText` will be split by `lineEnding` and each line will be added separately as `level`.

###### clear(toggle='true')
Clears the whole console.
When toggle is set to true, the console will be hidden.

###### stickBottom()
Stick to the bottom of the console panel.

###### stickTop()
Stick to the top of the console panel (default).

## TODO

* Write specs
* Add level filtering
* Show timestamp
* "Go to latest" button
