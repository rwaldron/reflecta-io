var es6 = require("es6-shim");
var Emitter = require("events").EventEmitter;
var priv = new Map();

var modes = Object.freeze({
  INPUT: 0,
  OUTPUT: 1,
  ANALOG: 2,
  PWM: 3,
  SERVO: 4
});

function Reflecta() {
  Emitter.call(this);

  var state = {
    isConnected: false,
    isReady: false,
    isReading: false,
  };

  priv.set(this, state);

  this.name = "reflecta-io";
  this.buffer = [];


  // NOTE: These are mapped to node-reflecta data
  this.pins = [];
  this.analogPins = [];



  Object.defineProperties(this, {
    isReady: {
      get: function() {
        return state.isReady;
      }
    }
  });

  // NOTE: These are mapped to node-reflecta events
  process.nextTick(function() {

    state.isReady = true;
    state.isConnected = true;

    this.emit("connect");
    this.emit("ready");

  }.bind(this));
}

Reflecta.prototype = Object.create(Emitter.prototype, {
  constructor: {
    value: Reflecta
  },
  MODES: {
    value: modes
  },
  HIGH: {
    value: 1
  },
  LOW: {
    value: 0
  }
});


Reflecta.prototype.pinMode = function(pin, mode) {

};

Reflecta.prototype.analogRead = function(pin, handler) {

};

Reflecta.prototype.digitalRead = function(pin, handler) {

};

Reflecta.prototype.analogWrite = function(pin, value) {

};

Reflecta.prototype.digitalWrite = function(pin, value) {

};

Reflecta.prototype.servoWrite = function(pin, value) {

};





module.exports = Reflecta;
