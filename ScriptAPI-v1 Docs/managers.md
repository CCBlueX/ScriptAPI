## Description
Each module, command or inventory tab has to be registered in the script's body otherwise it will not be available in the client. The script API offers different managers for inventory tabs, modules and commands. They can also be used to retreive modules or commands from the client.

### Register an inventory tab
```js
function InventoryTab() {
    // ...
}

var inventoryTab = new InventoryTab();

function onLoad() {
    creativeTabs.registerTab(inventoryTab);
}
```

### Register a module
```js
function Module() {
    // ...
}

var myModule = new Module(); // The module has to be instantiated before it can be registered.

function onEnable() {
    moduleManager.registerModule(myModule); 
}

function onDisable() {
    moduleManager.unregisterModule(myModule);
}
```

### Register a command
```js
function Command() {
    // ...
}

// References above
var command = new Command();

function onEnable() {
    commandManager.registerCommand(command);
}

function onDisable() {
    commandManager.unregisterCommand(command);
}
```

### Retreive a module
```js
// Gets a module from the ModuleManager (Returns module)
var killAuraModule = moduleManager.getModule("KillAura");

var name = killAuraModule.getName(); // Returns the name of the module (String)
var description = killAuraModule.getDescription(); // Returns the description of the module (String)
var category = killAuraModule.getCategory(); // Returns the category of the module (String)
var state = killAuraModule.getState(); // Returns whether a module is toggled (Boolean)
var keyBind = killAuraModule.getBind(); // Returns the code of the key the module is bound to (Integer)
var range = killAuraModule.getValue("Range"); // Gets a value of the module 
range.set(2.5); // Sets range value to 2.5
range.get(); // Gets value of range (2.5)

killAuraModule.setState(true); // Enables the module
killAuraModule.setState(false); // Disables the module

killAuraModule.setBind(-1); // Sets the bind of a module to a key code (Takes Integer)

killAuraModule.unregister(); // Unregisters the module from the ModuleManager
killAuraModule.register(); // Registers the module to the ModuleManager
```

### Execute a command
```js
commandManager.executeCommand(command, arguments);
commandManager.executeCommand(command);

// Example
commandManager.executeCommand(".help");
```