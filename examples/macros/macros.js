/// api_version=2
var script = registerScript({
    name: "Macros",
    version: "2.0.0",
    authors: ["Senk Ju"]
});

var File = Java.type("java.io.File");
var FileReader = Java.type("java.io.FileReader");
var BufferedReader = Java.type("java.io.BufferedReader");
var FileWriter = Java.type("java.io.FileWriter");
var BufferedWriter = Java.type("java.io.BufferedWriter");
var Keyboard = Java.type("org.lwjgl.input.Keyboard");
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");

var macros = {};
var prefix = LiquidBounce.commandManager.getPrefix();

function chatSyntax(message) {
    Chat.print("§8[§9§lMacros§8] §3Syntax: §7" + prefix + message);
}

function chatText(message) {
    Chat.print("§8[§9§lMacros§8] §3" + message);
}

function readFile(filePath) {
    try {
        var file = new File(filePath);
        var reader = new BufferedReader(new FileReader(file));
        var content = [];
        var line;

        while ((line = reader.readLine()) !== null) {
            content.push(line);
        }

        return content;
    } catch (err) { }
}

function writeFile(path, string) {
    try {
        writer = new BufferedWriter(new FileWriter(path));
        writer.write(string);

        writer.close();
    } catch (err) { }
}

function saveMacros() {
    var macrosJson = JSON.stringify(macros);

    writeFile(mc.mcDataDir + "/lb-macros.json", macrosJson);
}

function loadMacros() {
    macros = JSON.parse(readFile(mc.mcDataDir + "/lb-macros.json").join(""));
}

function joinArray(array, startIndex) {
    var joinedString = "";

    for (var i = startIndex; i < array.length; i++) {
        joinedString += array[i] + " ";
    }

    return joinedString.trim();
}

script.registerModule({
    name: "Macros",
    description: "Allows you to bind modules to keys.",
    category: "Misc"
}, function (module) {
    module.on("key", function (event) {
        var key = event.getKey();

        if (macros[key]) {
            commandManager.executeCommands(prefix + macros[key]);
        }
    });
});

script.registerCommand({
    name: "macro",
    aliases: ["macros"]
}, function (command) {
    command.on("execute", function (args) {
        if (args.length <= 1) {
            chatSyntax("macro <add/remove>");
            return;
        }

        switch (args[1]) {
            case "add":
                if (args.length <= 3) {
                    chatSyntax("macro add <key> <command...>");
                    return;
                }

                var key = args[2].toUpperCase();
                var keyCode = Keyboard.getKeyIndex(key);
                var command = joinArray(args, 3);

                if (command.startsWith(prefix)) {
                    command = command.substring(1, command.length);
                }

                macros[keyCode] = command;

                saveMacros();
                chatText("Successfully bound command '§7" + command + "§3' to key '§7" + key + "§3'.");

                break;

            case "remove":
                if (args.length <= 2) {
                    chatSyntax("macro remove <key>");
                    return;
                }

                var key = args[2].toUpperCase();
                var keyCode = Keyboard.getKeyIndex(key);

                if (macros[keyCode]) {
                    delete macros[keyCode];
                    chatText("Successfully removed macro.");
                    saveMacros();
                } else {
                    chatText("Macro does not exist!");
                }

                break;

            default:
                chatSyntax("macro <add/remove>");
        }
    });
});