var scriptName = "Timing Example";
var scriptVersion = 1.0;
var scriptAuthor = "CCBlueX";

script.import("lib/timingFunctions.js");

function TimeoutExample() {
    this.getName = function () {
        return "TimeoutExample";
    }

    this.getDescription = function () {
        return "";
    }

    this.getCategory = function () {
        return "Misc";
    }

    this.onEnable = function () {
        setTimeout(function () {
            chat.print("Hi! I am being executed five seconds after the module has been enabled2.");
        }, 1000 * 5);
    }
}

function IntervalExample() {
    var interval;

    this.getName = function () {
        return "IntervalExample";
    }

    this.getDescription = function () {
        return "";
    }

    this.getCategory = function () {
        return "Misc";
    }

    this.onEnable = function () {
        interval = setInterval(function () {
            chat.print("Hi! I am being executed every two seconds after the module has been enabled.");
        }, 1000 * 2);
    }

    this.onDisable = function () {
        clearInterval(interval);
    }
}

var timeoutExample = new TimeoutExample();
var intervalExample = new IntervalExample();

var timeoutExampleClient;
var intervalExampleClient;

function onLoad() { };

function onEnable() {
    timeoutExampleClient = moduleManager.registerModule(timeoutExample);
    intervalExampleClient = moduleManager.registerModule(intervalExample);
};

function onDisable() {
    moduleManager.unregisterModule(timeoutExampleClient);
    moduleManager.unregisterModule(intervalExampleClient);
};
