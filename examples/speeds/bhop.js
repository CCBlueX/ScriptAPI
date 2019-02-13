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
        mc.timer.timerSpeed = 2;
    }

    this.onUpdate = function() {


        if (mc.thePlayer.onGround) {
            mc.thePlayer.jump();
        } 

        mc.thePlayer.motionX *= 1.05;
        mc.thePlayer.motionZ *= 1.05;
        mc.thePlayer.jumpMovementFactor *= 1.5;
    }

    this.onDisable = function() {
        chat.print("ok");  
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
