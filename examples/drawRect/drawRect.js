var scriptName = "Draw Rect"; 
var scriptVersion = 1.0; 
var scriptAuthor = "CCBlueX"; 

script.import("drawRect_files/glFunctions.js");

function Rect() {

    this.getName = function() {
        return "DrawRect";
    };

    this.getDescription = function() {
        return "Draws a rectangle on the screen.";
    };

    this.getCategory = function() {
        return "Misc";
    };

    this.onRender2D = function() {
        // Part of https://github.com/CCBlueX/LiquidBounce-ScriptAPI/tree/master/lib
        drawRect(10, 10, 200, 200, 0xFFFFFFFF);
    }
}

var rect = new Rect();

var rectClient;

function onLoad() {

};

function onEnable() {
    rectClient = moduleManager.registerModule(rect);
};

function onDisable() {
    moduleManager.unregisterModule(rectClient);
};
