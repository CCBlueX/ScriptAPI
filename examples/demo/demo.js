/// api_version=2
// ^ First line has to contain a magic comment specifying the API version used. 

/* 
    Basic information about the script has to be provided when registering it.
    It will be disabled in LiquidBounce's ScriptManager GUI.
*/
var script = registerScript({
    name: "DemoScript", // Name of the script.
    version: "1.0.0", // Current version of the script.
    authors: ["CCBlueX"] // Array containing names of everyone who has worked on the script.
});

// Event called after the script has been loaded by the client.
script.on("load", function() {
    Chat.print("Demo Script loaded.");
});

// Event called after the script has been enabled by the client.
script.on("enable", function() {
    Chat.print("Demo Script enabled.");
});

// Event called after the script has been disabled by the client.
script.on("disable", function() {
    Chat.print("Demo Script disabled.");
});

// script.import can be used to import external JavaScript files into the current context
script.import("demo_files/tabs.js");
script.import("demo_files/modules.js");
script.import("demo_files/commands.js");