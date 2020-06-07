/*
    Registers a new module. Can be toggled from either the ClickGUI or TabGUI or by typing
    '.t TestModule' into the chat.   
*/
script.registerModule({
    name: "TestModule", // Name under which the module will be displayed.
    description: "This module has been created using LiquidBounce's script API.", // All modules should have a description.
    category: "Misc", // Category under which the script should be disabled inside all GUIs.
    settings: {
        /*
            Adds a setting to this module which can either be on or off (boolean).
            Check out the documentation on liquidbounce.net for a list of all supported setting types.
        */
        swingArm: Setting.boolean({
            name: "SwingArm",
            default: true
        })
    }
}, function(module) {
    // ^ registerModule takes a callback function as its second argument to which the instance of this script module is passed.

    /* 
        An event can be registered by calling the .on function on a script module. The first argument it takes is the name 
        of the event, the second another callback function to which event data will also be passed. Check out the documentation
        on liquidbounce.net for a full list of supported events.
    */
    // Event called every time the player enables this module.
    module.on("enable", function() {
        Chat.print("§c§lHey! I am now enabled.");
    });

    // Event called every time the player disables this module.
    module.on("disable", function() {
        Chat.print("§c§lBye! I am now disabled.");
    });

    // Event called every tick (~20 times/s) if the module is enabled.
    module.on("update", function() {
        // Only swing arm if SwingArm setting is enabled.
        if (module.settings.swingArm.get()) {
            mc.thePlayer.swingItem();
        }    
    });
});