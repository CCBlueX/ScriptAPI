function log(message, error) {
    Chat.print("§8[§9NESEmulator§8] " + (error ? "§c" : "§f") + message);
}

function readRom(fileName) {
    var file = new File(mc.mcDataDir + "/LiquidBounce-1.8/scripts/nes_roms/" + fileName);
    return FileUtils.readFileToString(file, StandardCharsets.ISO_8859_1);
}

function getInstalledRoms() {
    var roms = [];

    Files.walk(Paths.get(mc.mcDataDir + "/LiquidBounce-1.8/scripts/nes_roms"))
        .filter(function (file) {
            return file.toString().endsWith(".nes");
        }).map(function (file) {
            return file.toString().split(/\\|\//g).pop();
        }).forEach(function (rom) {
            roms.push(rom);
        });

    return roms;
}