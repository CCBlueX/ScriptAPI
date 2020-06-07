/// api_version=2
var script = registerScript({
    name: "Draw Rect",
    version: "2.0.0",
    authors: ["CCBlueX"]
});

// Part of https://github.com/CCBlueX/LiquidBounce-ScriptAPI/tree/master/lib
script.import("draw_rect_files/glFunctions.js");

script.registerModule({
    name: "DrawRect",
    description: "Draws a rectangle on the screen.",
    category: "Render"
}, function (module) {
    module.on("render2D", function (event) {
        drawRect(10, 10, 200, 200, 0xFFFFFFFF);
        drawCircle(60, 300, 50, 0xFFFFFFFF);
    });
});