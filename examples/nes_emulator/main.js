const script = registerScript({
    name: "NES Emulator",
    version: "1.0.0",
    authors: ["Senk Ju"],
});

const File = Java.type("java.io.File");
const RenderPipelines = Java.type("net.minecraft.client.renderer.RenderPipelines");
const Render2DKt = Java.type("net.ccbluex.liquidbounce.render.Render2DKt")
const TextureSetup = Java.type("net.minecraft.client.gui.render.TextureSetup");
const DynamicTexture = Java.type("net.minecraft.client.renderer.texture.DynamicTexture");
const FileUtils = Java.type("org.apache.commons.io.FileUtils");
const StandardCharsets = Java.type("java.nio.charset.StandardCharsets");
const Thread = Java.type("java.lang.Thread");

load("./emu/nes.js");
load("./emu/controller.js");

const ROMS_BASE_PATH = "./LiquidBounce/scripts/nes_emulator/roms";
const SCREEN_HEIGHT = 240;
const SCREEN_WIDTH = 256;

function readRom(name) {
    return FileUtils.readFileToString(new File(`${ROMS_BASE_PATH}/${name}`), StandardCharsets.ISO_8859_1);
}

function getInstalledRoms() {
    return ["None", ...(new File(ROMS_BASE_PATH).listFiles() ?? []).map(f => f.getName())];
}

const installedRoms = getInstalledRoms();

let texture = null;

script.on("enable", () => {
    texture = new DynamicTexture("NESEmulator Texture", SCREEN_WIDTH, SCREEN_HEIGHT, false);
});
script.on("disable", () => {
    texture?.close();
    texture = null;
});

script.registerModule({
    name: "NESEmulator",
    description: "Allows you to play NES games in the client.",
    category: "Fun",
    settings: {
        rom: Setting.choose({
            name: "ROM",
            choices: installedRoms,
            default: installedRoms[0]
        }),
        region: Setting.choose({
            name: "Region",
            choices: ["NTSC", "PAL"],
            default: "NTSC"
        }),
        scale: Setting.float({
            name: "Scale",
            default: 1,
            range: [1, 5]
        }),
        buttonA: Setting.key({
            name: "ButtonA",
            default: "key.keyboard.z"
        }),
        buttonB: Setting.key({
            name: "ButtonB",
            default: "key.keyboard.x"
        }),
        buttonSelect: Setting.key({
            name: "ButtonSelect",
            default: "key.keyboard.c"
        }),
        buttonStart: Setting.key({
            name: "ButtonStart",
            default: "key.keyboard.v"
        }),
        buttonUp: Setting.key({
            name: "ButtonUp",
            default: "key.keyboard.up"
        }),
        buttonDown: Setting.key({
            name: "ButtonDown",
            default: "key.keyboard.down"
        }),
        buttonLeft: Setting.key({
            name: "ButtonLeft",
            default: "key.keyboard.left"
        }),
        buttonRight: Setting.key({
            name: "ButtonRight",
            default: "key.keyboard.right"
        })
    }
}, mod => {
    const controller = [
        {
            setting: mod.settings.buttonA,
            emulatorKey: Controller.BUTTON_A
        },
        {
            setting: mod.settings.buttonB,
            emulatorKey: Controller.BUTTON_B
        },
        {
            setting: mod.settings.buttonSelect,
            emulatorKey: Controller.BUTTON_SELECT
        },
        {
            setting: mod.settings.buttonStart,
            emulatorKey: Controller.BUTTON_START
        },
        {
            setting: mod.settings.buttonUp,
            emulatorKey: Controller.BUTTON_UP
        },
        {
            setting: mod.settings.buttonDown,
            emulatorKey: Controller.BUTTON_DOWN
        },
        {
            setting: mod.settings.buttonLeft,
            emulatorKey: Controller.BUTTON_LEFT
        },
        {
            setting: mod.settings.buttonRight,
            emulatorKey: Controller.BUTTON_RIGHT
        }
    ];
    let nes = null;
    let dirty = false;
    let runEmulator = false;

    mod.on("enable", () => {
        if (mod.settings.rom.value === "None") {
            Client.displayChatMessage("Error: Mo ROM file selected. Select a ROM, then re-enable the module.");
            return;
        }

        let targetFramerate = 60;
        if (mod.settings.region.value === "PAL") {
            targetFramerate = 50;
        }

        runEmulator = true;
        nes = new NES({
            onFrame: frameBuffer => {
                if (!texture) return;

                for (let i = 0; i < frameBuffer.length; i++) {
                    const x = i % SCREEN_WIDTH;
                    const y = (i / SCREEN_WIDTH) | 0;

                    texture.getPixels().setPixelABGR(x, y, frameBuffer[i] | (255 << 24));
                }

                dirty = true;
            }
        });

        nes.loadROM(readRom(mod.settings.rom.value));

        AsyncUtil.launch(() => {
            while (runEmulator) {
                nes.frame();
                Thread.sleep((1000 / targetFramerate) | 0);
            }
        });
    });

    mod.on("disable", () => {
        runEmulator = false;
        nes = null;
    });

    mod.on("key", e => {
        const key = e.getKey();

        for (const k of controller) {
            if (k.setting.value.getName() === key.getName()) {
                if (e.getAction() === 1 || e.getAction() === 2) {
                    nes?.buttonDown(1, k.emulatorKey);
                } else {
                    nes?.buttonUp(1, k.emulatorKey);
                }
            }
        }
    });

    mod.on("overlayRender", e => {
        if (!texture) return;

        const context = e.getContext();
        const x = ~~(context.guiWidth() / 2 - Math.floor(SCREEN_WIDTH * mod.settings.scale.value) / 2);
        const y = ~~(context.guiHeight() / 2 - Math.floor(SCREEN_HEIGHT * mod.settings.scale.value) / 2);

        if (dirty) {
            texture.upload();
            dirty = false;
        }

        Render2DKt.drawTexQuad(
            context,
            TextureSetup.singleTexture(texture.getTextureView(), texture.getSampler()),
            x, y,
            x + Math.floor(SCREEN_WIDTH * mod.settings.scale.value) , y + Math.floor(SCREEN_HEIGHT * mod.settings.scale.value),
            0, 0, 1, 1, -1, RenderPipelines.GUI_TEXTURED
        )
    });
});
