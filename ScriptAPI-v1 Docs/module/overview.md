## ScriptAPI modules
Modules created with the ScriptAPI will appear in the ClickGUI and TabGUI. They behave the same as regular modules and can be activated, deactivated, bound to a key and adjusted via values if desired.

## Example
```js
function ExampleModule() {

    var myBoolValue = value.createBoolean("MyBoolValue", true);
    var myListValue = value.createList("MyListValue", ["Value1", "Value2", "Value3"], "Value2");

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

    // 'getTag()' returns a string which will be shown next to the module's name in the ArrayList.
    this.getTag = function() {
        return listValue.get(); // Has to be a string
    };

    // 'onEnable()' is being executed once the user activated the module.
    this.onEnable = function() {
        if (myBoolValue.get()) {
            chat.print("MyBoolValue is enabled.");
        } else {
            chat.print("MyBoolValue is disabled.");
        }

        chat.print("§c§lHey! I am now enabled.");

        myBoolValue.set(false);
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

    /* In 'addValues' custom values can be added to a module. Those will appear in the ClickGUI 
    and can be changed by the user. */
    this.addValues = function(values) {
        values.add(myBoolValue);
    }
}
```