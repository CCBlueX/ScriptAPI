// Builder's Hand By Mp0wers
// License: MIT
// Version: 1.1

script.import("lib/minecraftUtils.js"); // Minecraft Utilities 1.1

var Material = Java.type("net.minecraft.block.material.Material");

var scriptName = "Builder\'s Hand";
var scriptVersion = 1.1;
var scriptAuthor = "Mp0wers";

function BuildersHand() {
	this.getName = function() {
		return "BuildersHand";
	};
	this.getDescription = function() {
		return "Place on opposite side.";
	};
	this.getCategory = function() {
		return "World";
	};
	this.onEnable = function() {
		hookKeyBind(mc.gameSettings.keyBindAttack, "myKeyBindAttack");
	};
	this.onDisable = function() {
		unhookAllKeyBinds();
	};
	this.onUpdate = function() {
		if (myKeyBindAttack.isKeyDown() && mc.rightClickDelayTimer == 0 && !mc.thePlayer.isUsingItem()) {
			this.placeOnOppositeSide();
		};
	};
	this.placeOnOppositeSide = function() {
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
};

var moduleBuildersHand = new BuildersHand();
var managerBuildersHand;

function onLoad() {};
function onEnable() {
	managerBuildersHand = moduleManager.registerModule(moduleBuildersHand);
};
function onDisable() {
	moduleManager.unregisterModule(managerBuildersHand);
};