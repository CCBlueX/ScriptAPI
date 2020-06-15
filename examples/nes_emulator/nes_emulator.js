/// api_version=2
/// engine_flags=-ot=true
var lock = {};

var script = registerScript({
    name: "NES Emulator",
    version: "2.0.0",
    authors: ["Senk Ju"]
});

script.import("nes_emulator_files/imports.js");
script.import("nes_emulator_files/utils.js");
script.import("nes_emulator_files/emulator/nes.js");
script.import("nes_emulator_files/emulator/controller.js");

var installedRoms = getInstalledRoms();

script.registerModule({
    name: "NESEmulator",
    description: "Allows you to play NES games inside LiquidBounce.",
    category: "Fun",
    settings: {
        rom: Setting.list({
            name: "ROM",
            values: installedRoms,
            default: installedRoms[0] || null
        }),
        buttonA: Setting.text({
            name: "A",
            default: "A"
        }),
        buttonB: Setting.text({
            name: "B",
            default: "B"
        }),
        buttonSelect: Setting.text({
            name: "Select",
            default: "ENTER"
        }),
        buttonStart: Setting.text({
            name: "Start",
            default: "SPACE"
        }),
        buttonUp: Setting.text({
            name: "Up",
            default: "UP"
        }),
        buttonDown: Setting.text({
            name: "Down",
            default: "DOWN"
        }),
        buttonLeft: Setting.text({
            name: "Left",
            default: "LEFT"
        }),
        buttonRight: Setting.text({
            name: "Right",
            default: "RIGHT"
        })
    }
}, function (module) {
    var nes = null;
    var currentFrame = null;
    var width = 256;
    var height = 240;
    var texture = null;
    var emulatorThread = null;
    var buttons = null;
    var fps = 0;

    var setButtonPressed = function (key, pressed) {
        if (pressed) {
            nes.buttonDown(1, key);
        } else {
            nes.buttonUp(1, key);
        }
    }

    module.on("enable", function () {
        log("Loading emulator...", false);

        var lastFrameTime = System.currentTimeMillis();
        var frameDeltaTime = 0;

        buttons = {
            a: Keyboard.getKeyIndex(module.settings.buttonA.get().toUpperCase()),
            b: Keyboard.getKeyIndex(module.settings.buttonB.get().toUpperCase()),
            select: Keyboard.getKeyIndex(module.settings.buttonSelect.get().toUpperCase()),
            start: Keyboard.getKeyIndex(module.settings.buttonStart.get().toUpperCase()),
            uo: Keyboard.getKeyIndex(module.settings.buttonUp.get().toUpperCase()),
            down: Keyboard.getKeyIndex(module.settings.buttonDown.get().toUpperCase()),
            left: Keyboard.getKeyIndex(module.settings.buttonLeft.get().toUpperCase()),
            right: Keyboard.getKeyIndex(module.settings.buttonRight.get().toUpperCase())
        };

        nes = new NES({
            onFrame: function (frameBuffer) {
                Java.synchronized(function () {
                    currentFrame = ByteBuffer.allocateDirect(frameBuffer.length * 3);
                    for (var i = 0; i < frameBuffer.length; i++) {
                        var pixel = frameBuffer[i];

                        currentFrame.put(pixel & 0xFF);
                        currentFrame.put((pixel >> 8) & 0xFF);
                        currentFrame.put((pixel >> 16) & 0xFF);
                    }
                    currentFrame.flip();
                }, lock)();
            }
        });

        texture = GL11.glGenTextures();

        GL11.glBindTexture(GL11.GL_TEXTURE_2D, texture);
        GL11.glPixelStorei(GL11.GL_UNPACK_ALIGNMENT, 1);
        GL11.glTexParameteri(GL11.GL_TEXTURE_2D, GL11.GL_TEXTURE_MIN_FILTER, GL11.GL_NEAREST);
        GL11.glTexParameteri(GL11.GL_TEXTURE_2D, GL11.GL_TEXTURE_MAG_FILTER, GL11.GL_NEAREST);
        GL11.glBindTexture(GL11.GL_TEXTURE_2D, 0);

        try {
            nes.loadROM(readRom(module.settings.rom.get()));
        } catch (err) {
            log("Failed to laod rom " + module.settings.rom.get(), true);
        }

        emulatorThread = new Timer("Emulator-Thread", true);
        emulatorThread.schedule(function () {
            nes.frame();
            frameDeltaTime = System.currentTimeMillis() - lastFrameTime;
            lastFrameTime = System.currentTimeMillis();
        }, 1000 / 60, 1000 / 60);

        emulatorThread.schedule(function () {
            fps = (1000 / frameDeltaTime) | 0;
        }, 1000 * 2, 1000 * 2);

        log("Performance will improve over time!", false);
    });

    module.on("disable", function () {
        if (texture !== null) {
            GL11.glDeleteTextures(texture);
        }

        if (emulatorThread !== null) {
            emulatorThread.cancel();
        }
    });

    module.on("update", function () {
        if (nes === null || buttons === null) {
            return;
        }

        setButtonPressed(Controller.BUTTON_A, Keyboard.isKeyDown(buttons.a));
        setButtonPressed(Controller.BUTTON_B, Keyboard.isKeyDown(buttons.b));
        setButtonPressed(Controller.BUTTON_SELECT, Keyboard.isKeyDown(buttons.select));
        setButtonPressed(Controller.BUTTON_START, Keyboard.isKeyDown(buttons.start));
        setButtonPressed(Controller.BUTTON_UP, Keyboard.isKeyDown(buttons.up));
        setButtonPressed(Controller.BUTTON_DOWN, Keyboard.isKeyDown(buttons.down));
        setButtonPressed(Controller.BUTTON_LEFT, Keyboard.isKeyDown(buttons.left));
        setButtonPressed(Controller.BUTTON_RIGHT, Keyboard.isKeyDown(buttons.right));
    });

    module.on("render2D", function (event) {
        if (currentFrame === null || nes === null) {
            return;
        }

        var resolution = new ScaledResolution(mc);

        var x = resolution.getScaledWidth() / 2 - width / 2;
        var y = resolution.getScaledHeight() / 2 - height / 2;

        Fonts.font40.drawString(fps + " FPS", x, y - 10, 0, true);

        GL11.glBindTexture(GL11.GL_TEXTURE_2D, texture);

        Java.synchronized(function () {
            GL11.glTexImage2D(GL11.GL_TEXTURE_2D, 0, GL11.GL_RGB, width, height, 0, GL11.GL_RGB, GL11.GL_UNSIGNED_BYTE, currentFrame);
        }, lock)();

        GL11.glBindTexture(GL11.GL_TEXTURE_2D, 0);
        GL11.glBindTexture(GL11.GL_TEXTURE_2D, texture);
        Gui.drawScaledCustomSizeModalRect(x, y, 0, 0, width, height, width, height, width, height);
    });

    module.on("move", function (event) {
        event.cancelEvent();
    });
});