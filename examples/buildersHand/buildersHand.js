/// api_version=2
// Builder's Hand By Mp0wers
// License: MIT
// Version: 2.0.0

var Material = Java.type("net.minecraft.block.material.Material");

var script = registerScript({
    name: "Builder's Hand",
    version: "2.0.0",
    authors: ["Mp0wers"]
});

script.import("lib/minecraftUtils.js"); // Minecraft Utilities 1.1

script.registerModule({
    name: "BuildersHand",
    description: "Place on opposite side.",
    category: "World"
}, function(module) {
    var placeOnOppositeSide = function() {
		mc.rightClickDelayTimer = 4;
		var itemStack = mc.thePlayer.inventory.getCurrentItem();
		var blockPos = mc.objectMouseOver.getBlockPos();
		var placeSide = mc.objectMouseOver.sideHit.getOpposite();
		var hitVec = mc.objectMouseOver.hitVec;
		if (mc.theWorld.getBlockState(blockPos).getBlock().getMaterial() != Material.air) {
			while (true) {
				if (!isBlockInReach(mc.thePlayer, blockPos)) {
					break;
				};
				if (mc.playerController.onPlayerRightClick(mc.thePlayer, mc.theWorld, itemStack, blockPos, placeSide, hitVec)) {
					mc.thePlayer.swingItem();
					break;
				};
				blockPos = blockPos.add(placeSide.getDirectionVec());
			};
		};
	};

    module.on("enable", function() {
        hookKeyBind(mc.gameSettings.keyBindAttack, "myKeyBindAttack");
    });

    module.on("disable", function() {
        unhookAllKeyBinds();
    });

    module.on("update", function() {
        if (myKeyBindAttack.isKeyDown() && mc.rightClickDelayTimer == 0 && !mc.thePlayer.isUsingItem()) {
			placeOnOppositeSide();
		};
    });
});