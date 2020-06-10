### Example
```js
function ExampleCommand() {

    /* 'getName()' returns the the name of the command. In this example, '.exampleCommand' will run 
    the command. */
    this.getName = function() {
        return "exampleCommand";
    };

    /* 'getAliases()' can be used to define alias names for a command. '.testCommand' and '.demoCommand' 
    execute the same code as '.exampleCommand'. */
    this.getAliases = function() {
        return ["testCommand", "demoCommand"];
    };

    /* 'execute()' contains the actual code of the command. It is being executed once the sent the command. 
    args contains the arguments the user passed to the command. args[0] is the command name. */
    this.execute = function(args) {
        chat.print("§aHey! Successfully executed command!");
        chat.print("Axolotl");

        mc.thePlayer.jump();
    };
}
```

### Command Events
```js
this.execute = function(args) {
    // Code in here will be executed as soon as the user executes the command
};
```