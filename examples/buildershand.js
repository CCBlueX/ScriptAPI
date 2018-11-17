// Builder's Hand By Mp0wers
// License: MIT
// Version: 1.1

script.import('lib/minecraftUtils.js'); // Minecraft Utilities 1.0

var p0w = {};
p0w.keybind1 = null;
p0w.keybind1code = 0;

var Material = Java.type('net.minecraft.block.material.Material');
var KeyBinding = Java.type('net.minecraft.client.settings.KeyBinding');

var scriptName = 'Builder\'s Hand';
var scriptVersion = 1.1;
var scriptAuthor = 'Mp0wers';

function BuildersHand() {
	this.getName = function() {
		return 'BuildersHand';
	};
	this.getDescription = function() {
		return 'Place on opposite side.';
	};
	this.getCategory = function() {
		return 'World';
	};
	this.onEnable = function() {
		p0w.keybind1code = mc.gameSettings.keyBindAttack.getKeyCode();
		if (p0w.keybind1code == 0) {
			p0w.keybind1code = mc.gameSettings.keyBindAttack.getKeyCodeDefault();
		};
		mc.gameSettings.keyBindAttack.setKeyCode(0);
		if (p0w.keybind1 == null) {
			p0w.keybind1 = new KeyBinding('key.p0w_keybind1', p0w.keybind1code, 'key.categories.gameplay');
		} else {
			p0w.keybind1.setKeyCode(p0w.keybind1code);
		};
		KeyBinding.resetKeyBindingArrayAndHash();
	};
	this.onDisable = function() {
		p0w.keybind1.setKeyCode(0);
		mc.gameSettings.keyBindAttack.setKeyCode(p0w.keybind1code);
		KeyBinding.resetKeyBindingArrayAndHash();
	};
	this.onUpdate = function() {
		if (p0w.keybind1.isKeyDown() && mc.rightClickDelayTimer == 0 && !mc.thePlayer.isUsingItem()) {
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
			for (;;) {
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