/* 
    LiquidBounce Scripting Example by CCBlueX
    License: MIT
    Last Updated: 10/13/2018
    Version: 1.0

    NOTICE: Due to limitations of Java 8 (JRE 8) only JavaScript up to ES5.1 is supported!
*/

// Basic information about the script has to be defined at the beginning of the main file.
var scriptName = "Demo Script"; // The name of your script
var scriptVersion = 1.0; // The version of your script 
var scriptAuthor = "CCBlueX"; // The author of your script (eg. your username)

// External scripts can be imported using 'script.import("path/to/file")'
script.import("demo_files/commands.js");
script.import("demo_files/modules.js");
script.import("demo_files/tabs.js");

/* LiquidBounce's script API allows the creation of custom commands, modules and creative 
inventory tabs. Every command, module or inventory tab has to be instantiated before it can be 
registered by the client. */
var exampleCommand = new ExampleCommand();
var exampleModule = new ExampleModule();
var exampleTab = new ExampleTab();

/* Commands and modules have a client instance defined by LiquidBounce. They have to be 
declared in the script body to make them globally scoped and thereby accessible in both 
'onEnable()' and 'onDisable()'. */
var exampleCommandClient;
var exampleModuleClient;

// 'onLoad()' is being executed directly after the client loaded the script.
function onLoad() {
    // Each creative inventory tab has to be registered once the script has been loaded.
    creativeTabs.registerTab(exampleTab);
};

// 'onEnable()' is being executed once the module has been enabled by the user.
function onEnable() {
    /* When the script is being enabled each module or command has been registered to make them 
    visible to the client. */
    exampleCommandClient = commandManager.registerCommand(exampleCommand);
    exampleModuleClient = moduleManager.registerModule(exampleModule);
};

// 'onDisable()' is being executed when the user reloads the script.
function onDisable() {
    /* Commands and Modules should be unregistered when the script is being disabled. 
    Make sure to pass the client instance of each module or command instead of the script instance. */
    commandManager.unregisterCommand(exampleCommandClient);
    moduleManager.unregisterModule(exampleModuleClient);
};
