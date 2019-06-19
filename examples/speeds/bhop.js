var scriptName = "BHop";
var scriptAuthor = "Senk Ju";
var scriptVersion = 1.0;

function BHopModule() {

    this.getName = function() {
        return "BHop";
    }

    this.getDescription = function() {
        return "An example BHop.";
    }

    this.getCategory = function() {
        return "Movement";
    }

    this.onEnable = function() {
        mc.timer.timerSpeed = 1.2;
    }

    this.onMotion = function() {
        if (!mc.gameSettings.keyBindForward.isKeyDown())
            return;

        mc.thePlayer.setSprinting(true);

        if (mc.thePlayer.onGround) 
            mc.thePlayer.jump();
        

        mc.thePlayer.motionX *= 1.02;
        mc.thePlayer.motionZ *= 1.02;
    }

    this.onDisable = function() {
        mc.timer.timerSpeed = 1;
    }
}

var bhopModule = new BHopModule();
var bhopModuleClient;

function onEnable() {
    bhopModuleClient = moduleManager.registerModule(bhopModule);
}

function onDisable() {
    moduleManager.unregisterModule(bhopModuleClient);
}
