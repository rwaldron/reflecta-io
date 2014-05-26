"use strict";

var Reflecta = require("../lib/reflecta");
var Emitter = require("events").EventEmitter;
var sinon = require("sinon");

function State() {
  this.isConnected = false;
  this.isReady = false;
  this.isReading = false;
}


exports["Reflecta"] = {
  setUp: function(done) {

    this.clock = sinon.useFakeTimers();

    this.state = new State();
    this.map = sinon.stub(Map.prototype, "get").returns(this.state);

    this.reflecta = new Reflecta();

    this.proto = {};

    this.proto.functions = [{
      name: "analogRead"
    }, {
      name: "analogWrite"
    }, {
      name: "digitalRead"
    }, {
      name: "digitalWrite"
    }, {
      name: "pinMode"
    }, {
      name: "servoWrite"
    }];

    this.proto.objects = [{
      name: "MODES"
    }];

    this.proto.numbers = [{
      name: "HIGH"
    }, {
      name: "LOW"
    }];

    this.instance = [{
      name: "pins"
    }, {
      name: "analogPins"
    }];

    done();
  },
  tearDown: function(done) {
    this.map.restore();
    this.clock.restore();
    done();
  },
  shape: function(test) {
    test.expect(
      this.proto.functions.length +
      this.proto.objects.length +
      this.proto.numbers.length +
      this.instance.length
    );

    this.proto.functions.forEach(function(method) {
      test.equal(
        typeof this.reflecta[method.name], "function",
        "Has method: " + method.name
      );
    }, this);

    this.proto.objects.forEach(function(method) {
      test.equal(
        typeof this.reflecta[method.name], "object",
        "Has property: " + method.name
      );
    }, this);

    this.proto.numbers.forEach(function(property) {
      test.equal(
        typeof this.reflecta[property.name], "number",
        "Has property: " + property.name
      );
    }, this);

    this.instance.forEach(function(property) {
      test.notEqual(
        typeof this.reflecta[property.name], "undefined",
        "Has property: " + property.name
      );
    }, this);

    test.done();
  },
  readonly: function(test) {
    test.expect(7);

    test.equal(this.reflecta.HIGH, 1);

    test.throws(function() {
      this.reflecta.HIGH = 42;
    });

    test.equal(this.reflecta.LOW, 0);

    test.throws(function() {
      this.reflecta.LOW = 42;
    });

    test.deepEqual(this.reflecta.MODES, {
      INPUT: 0,
      OUTPUT: 1,
      ANALOG: 2,
      PWM: 3,
      SERVO: 4
    });

    test.throws(function() {
      this.reflecta.MODES.INPUT = 42;
    });

    test.throws(function() {
      this.reflecta.MODES = 42;
    });

    test.done();
  },
  emitter: function(test) {
    test.expect(1);
    test.ok(this.reflecta instanceof Emitter);
    test.done();
  },
  connected: function(test) {
    test.expect(1);

    this.reflecta.on("connect", function() {
      test.ok(true);
      test.done();
    });
  },
  ready: function(test) {
    test.expect(1);

    this.reflecta.on("ready", function() {
      test.ok(true);
      test.done();
    });
  }
};
