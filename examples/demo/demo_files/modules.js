/* Every command consists of a main function and several inner functions 
(getName, getDescription, getCategory, onEnable, onDisable, onUpdate). */
function ExampleModule() {

    // 'getName()' returns the name of the module. This name will be used in the ClickGUI/TabGUI.
    this.getName = function() {
        return "TestModule";
    };

    /* 'getDescription()' returns the description of the module. 
    It can be seen when hovering the module in the ClickGUI. */
    this.getDescription = function() {
        return "This module has been created using LiquidBounce's scripting API.";
    };

    // 'getCategory()' returns the name of the ClickGUI/TabGUI category the module should be added to.
    this.getCategory = function() {
        return "Exploit";
    };

    // 'onEnable()' is being executed once the user activated the module.
    this.onEnable = function() {
        chat.print("§c§lHey! I am now enabled.");
    };

    /* 'onDisable()' is being executed once the user disabled the module. 
    Changed Minecraft values should be reset here. */
    this.onDisable = function() {
        chat.print("§c§lBye! I am now disabled.");
    };

    /* 'onUpdate()' is being executed constantly (every tick => 20 times per seconds) 
    if the module is enabled. */
    this.onUpdate = function() {
        mc.thePlayer.swingItem();
    }
}