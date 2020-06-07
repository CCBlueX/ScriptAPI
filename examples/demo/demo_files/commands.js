/*
    Registers a new command. Can be invoked by typing '.exampleCommand' into the chat.
    '.testCommand' and '.demoCommand' will behave the same as '.exampleCommand'.
*/
script.registerCommand({
    name: "exampleCommand", // Regular name of the command.
    aliases: ["testCommand", "demoCommand"] // Array containing alternative names for the command. Can be empty.
}, function(command) {
    // ^ registerCommand takes a callback function as its second argument to which the instance of this script command is passed.

    /*
        Commands only have one event: execute. It is called every time the player executes the command. To its callback function
        an array containing the arguments passed to this command by the user is passed.
    */
    command.on("execute", function(args) {
        Chat.print("§aHey! Successfully executed command!");
        Chat.print("Axolotl");

        mc.thePlayer.jump();
    });
});