# Atom Console package

**This isn't a terminal**. It's only a log console. Great for showing compilation output, long responses or general logs.

![Screenshot](https://github.com/spark/console-panel/raw/master/resources/screenshot.png)

## Usage

By itself package doesn't do anything but it provides a service other packages can consume:

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

When consuming console panel you'll get instance of `ConsoleManager` which has following methods:

###### toggle()
Toggles console panel.

###### log(message, level='info')
Logs a message. `message` can be `String` or a custom `View` that will be appended.

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

###### clear()
Clears whole console.

## TODO

* Write specs
* Add level filtering
* Show timestamp
* "Go to latest" button
