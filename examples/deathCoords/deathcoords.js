/// api_version=2
var script = registerScript({
    name: "DeathCoords",
    version: "2.0.0",
    authors: ["Senk Ju"]
});

script.registerModule({
    name: "DeathCoords",
    category: "Misc",
    description: "Displays the coordinates the player died at in the chat."
}, function(module) {
    var sentMessage = false;

    module.on("update", function() {
        if (mc.thePlayer.getHealth() <= 0) {
            if (!sentMessage) {
                var posX = mc.thePlayer.posX.toFixed(0);
                var posY = mc.thePlayer.posY.toFixed(0);
                var posZ = mc.thePlayer.posZ.toFixed(0);

                var coords = posX + "/" + posY + "/" + posZ;

                Chat.print("§8[§9DeathCoords§8] §f" + coords);
                sentMessage = true;
            }
        } else {
            sentMessage = false;
        }
    });
});