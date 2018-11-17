// Minecraft Utilities By Mp0wers
// License: MIT
// Version: 1.0

var EnumFacing = Java.type('net.minecraft.util.EnumFacing');
var Vec3 = Java.type('net.minecraft.util.Vec3');

function getCenterOfBlockSide(blockPosIn, sideIn) {
	var posVec = new Vec3(blockPosIn).addVector(0.5, 0.5, 0.5);
	var dirVec = new Vec3(sideIn.getDirectionVec());
	var resultVec = posVec.addVector(dirVec.xCoord * 0.5, dirVec.yCoord * 0.5, dirVec.zCoord * 0.5);
	return resultVec;
};

function isBlockInReach(entityIn, blockPosIn) {
	var reachDistance = mc.playerController.getBlockReachDistance() + 0.25;
	var eyesPos = entityIn.getPositionEyes(1.0);
	var blockSide, blockSideCenter, distanceToBlockSide, closestSide;
	var lowestDistance = null;
	for each (blockSide in EnumFacing.values()) {
		blockSideCenter = getCenterOfBlockSide(blockPosIn, blockSide);
		distanceToBlockSide = eyesPos.distanceTo(blockSideCenter);
		if (lowestDistance == null || distanceToBlockSide < lowestDistance) {
			lowestDistance = distanceToBlockSide;
			closestSide = blockSide;
		};
	};
	if (lowestDistance <= reachDistance) {
		return true;
	};
	return false;
};