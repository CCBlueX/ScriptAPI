## ScriptManager
The ScriptManager serves as an overview of all installed scripts, their author and current version. It also allows importing additional scripts and deleting already installed ones. The Import button allows you to import single script files as well as compressed zip packages cotaining multiple script files.

![scriptmanager](https://liquidbounce.net/img/docs/scriptmanager.png)

## Getting started with developing
LiquidBounce's script API is based on Nashorn, a JavaScript implementation written entirely in Java. Nashorn compiles scripts to regular byte code and loads it into the runtime using a class loader. 
The script API allows direct access to all Minecraft classes and Java features.

### General information about the script
The main file of your project must contain the following basic information. These will be displayed in the ScriptManager.
```js
var scriptName = "Demo Script"; // The name of your script
var scriptVersion = 1.0; // The version of your script 
var scriptAuthor = "CCBlueX"; // The author of your script (eg. your username)
```

### Creating a new module
Every module is scoped in a function which has the same name as the module you are going to create. It will be acting like a class and the name should therefore start with a capital letter. 
```js
function ExampleModule() {

}
```

Information about the module should be defined at the beginning of the function. Each module has a name, a category and a description. The provided category specifies in which ClickGUI/TabGUI category the module should be displayed. The following categories are available: `Combat, Player, Movement, Render, World, Misc, Exploit, Fun`.

This is what your general module structure should look like:
```js
function ExampleModule() {

    this.getName = function() {
        return "TestModule";
    };

    this.getDescription = function() {
        return "This module has been created using LiquidBounce's scripting API.";
    };

    this.getCategory = function() {
        return "Misc";
    };
}
```

LiquidBounce offers several functions that are called by the client as soon as the corresponding event is triggered. The following events are supported among others. For the complete list, click <a href="docs?show=ScriptAPI-Creating%20Modules-Supported%20Events">here</a>.
* onEnable: Is called as soon as the module is activated.
* onDisable: Is called as soon as the module is disabled.
* onUpdate: Is called once every tick (~20 times per second) if the module is enabled. Code in this event is therefore executed practically permanently.

In the code, an event looks like this:
```js
this.eventName = function() {
    // Your code here
};
```

The code below will make the player swing the currently held item constantly when enabled:
```js
function ExampleModule() {

    this.getName = function() {
        return "TestModule";
    };

    this.getDescription = function() {
        return "This module has been created using LiquidBounce's scripting API.";
    };

    this.getCategory = function() {
        return "Misc";
    };

    this.onUpdate = function() {
        mc.thePlayer.swingItem();
    }
}
```

Every module must be instantiated before it can be registered with the client. The following code creates a new instance of ExampleModule and stores it in a variable called `exampleModule`:
```js
var exampleModule = new ExampleModule();
```

Additionally every module needs a ClientInstance before it can be registered. The ClientInstance is used internally by LiquidBounce to refer to a module. It has to be declared just below the module instance. This is done to make it globally scoped and thereby accessible from every function inside the script. 
```js
var exampleModuleClient;
```

Similar to modules, the whole script has some events. The following events are available:
* onLoad: Is called when the client loads the script.
* onEnable: Is called once the script has been enabled by the client.
* onDisabled: Is called as soon as the client deactivates the script (e.g. when the user reloads the client).

Modules must be registered with the client in the onEnable event.
```js
function onEnable() {
    moduleManager.registerModule(exampleModule);
};
```

In the onDisable event, all modules must also be un-registered again.
```js
function onDisable() {
    moduleManager.unregisterModule(exampleModule);
};
```

That is it! You have now written your first script. The entire code created on this page looks like this:
```js
var scriptName = "Demo Script"; // The name of your script
var scriptVersion = 1.0; // The version of your script 
var scriptAuthor = "CCBlueX"; // The author of your script (eg. your username)

function ExampleModule() {
    this.getName = function() {
        return "TestModule";
    };

    this.getDescription = function() {
        return "This module has been created using LiquidBounce's scripting API.";
    };

    this.getCategory = function() {
        return "Misc";
    };

    this.onUpdate = function() {
        mc.thePlayer.swingItem();
    }
}

var exampleModule = new ExampleModule();

function onEnable() {
    moduleManager.registerModule(exampleModule);
};

function onDisable() {
    moduleManager.unregisterModule(exampleModule );
};
```

A more detailed example script can be found [here](https://github.com/CCBlueX/LiquidBounce-ScriptAPI/tree/master/examples/demo).