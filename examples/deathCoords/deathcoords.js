var scriptName = "DeathCoords";
var scriptVersion = 1.0;
var scriptAuthor = "Senk Ju";

function DeathCoordsModule() {
    var sentMessage = false;

    this.getName = function () {
        return "DeathCoords";
    }

    this.getCategory = function () {
        return "Misc";
    }

    this.getDescription = function () {
        return "Displays the coordinates you died at in the chat.";
    }

    this.onUpdate = function () {
        if (mc.thePlayer.getHealth() <= 0) {
            if (!sentMessage) {
                var posX = mc.thePlayer.posX.toFixed(0);
                var posY = mc.thePlayer.posY.toFixed(0);
                var posZ = mc.thePlayer.posZ.toFixed(0);

                var coords = posX + "/" + posY + "/" + posZ;

                chat.print("§8[§9DeathCoords§8] §f" + coords);
                sentMessage = true;
            }
        } else {
            sentMessage = false;
        }
    }
}


var deathCoordsModule = new DeathCoordsModule();
var deathCoordsModuleClient;

function onEnable() {
    deathCoordsModuleClient = moduleManager.registerModule(deathCoordsModule);
}

function onDisable() {
    moduleManager.unregisterModule(deathCoordsModuleClient);
}
