# Reflecta-io

# This is a non functional work in progress.

[![Build Status](https://travis-ci.org/rwaldron/reflecta-io.png?branch=master)](https://travis-ci.org/rwaldron/reflecta-io)

Reflacta-io is a Firmata alternative for communicating with Arduino boards.

### Getting Started

In order to use the reflecta-io library, you will need to load the special
[StandardReflecta](https://github.com/JayBeavers/Reflecta) firmware onto your
Arduino device. We recommend you review [Reflecta's Getting Started](https://github.com/JayBeavers/Reflecta#getting-started) section before continuing.

### Blink an Led

The "Hello World" of microcontroller programming:

```js
var Reflecta = require("reflecta-io");
var board = new Reflecta();

board.on("ready", function() {
  console.log("CONNECTED");
  this.pinMode(13, this.MODES.OUTPUT);

  var byte = 0;

  // This will "blink" the on board led
  setInterval(function() {
    this.digitalWrite(13, (byte ^= 1));
  }.bind(this), 500);
});
```

### Johnny-Five IO Plugin

Reflecta-IO can be used as an [IO Plugin](https://github.com/rwaldron/johnny-five/wiki/IO-Plugins) for [Johnny-Five](https://github.com/rwaldron/johnny-five):

```js
var five = require("johnny-five");
var Reflecta = require("reflecta-io");
var board = new five.Board({
  io: new Reflecta()
});

board.on("ready", function() {
  var led = new five.Led(13);
  led.blink();
});
```


### API

**MODES**

> The `MODES` property is available as a Reflecta instance property:

```js
var board = new Reflecta(...);
board.MODES;
```
- INPUT: 0
- OUTPUT: 1
- ANALOG: 2
- PWM: 3
- SERVO: 4


**pinMode(pin, MODE)**

> Set a pin's mode to any one of the MODES

Example:
```js
var board = new Reflecta(...);

board.on("ready", function() {

  // Set digital pin 7 to OUTPUT:
  this.pinMode(13, this.MODES.OUTPUT);

  // or just use the integer:
  this.pinMode(13, 1);

});
```



**digitalWrite(pin, value)**

> Sets the pin to `1` or `0`, which either connects it to 5V or to GND (ground).

Example:
```js
var board = new Reflecta(...);

board.on("ready", function() {

  // This will turn ON the on-board LED
  this.digitalWrite(13, 1);

  // OR...

  // This will turn OFF the on-board LED
  this.digitalWrite(13, 0);

});
```

**analogWrite(pin, value)**

> Sets the pin to an 8-bit value between 0 and 255, where 0 is the same as LOW and 255 is the same as HIGH. This is sort of like sending a voltage between 0 and 5V, but since this is a digital system, it uses a mechanism called Pulse Width Modulation, or PWM. You could use analogWrite to dim an LED, as an example. PWM is available on 3, 5, 6, 9, 10, or 11.


Example:
```js
var board = new Reflecta(...);

board.on("ready", function() {

  // Set an LED to full brightness
  this.analogWrite(10, 255);

  // OR...

  // Set an LED to half brightness
  this.analogWrite(10, 128);

});
```

**servoWrite(pin, value)**

> Sets the pin to a value between 0 and 180, where the value represents degrees of the servo horn. The value is converted to a PWM signal. PWM is available on 3, 5, 6, 9, 10, or 11.

Example:
```js
var board = new Reflecta(...);

board.on("ready", function() {

  // Move a servo to 90 degrees
  this.servoWrite(9, 90);

});
```


**digitalRead(pin, handler)** Setup a continuous read handler for specific digital pin (2-13).

> This will read the digital value of a pin, which can be read as either HIGH or LOW. If you were to connect the pin to a 5V source, it would read HIGH (1); if you connect it to GND, it would read LOW (0).

Example:
```js
var board = new Reflecta(...);

board.on("ready", function() {

  // Log all the readings for 9
  this.digitalRead(9, function(data) {
    console.log(data);
  });

});
```


**analogRead(pin, handler)** Setup a continuous read handler for specific analog pin (A0-A6). Use with all analog sensors.


Example:
```js
var board = new Reflecta(...);

board.on("ready", function() {

  // Log all the readings for A1
  this.analogRead("A1", function(data) {
    console.log(data);
  });

});
```



## License
See LICENSE file.
