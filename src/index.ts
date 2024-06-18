import { KScript } from "./base/script"
import { BooleanSetting, KModule, TextArraySetting, TextSetting } from "./base/module"

import "./extensions/array.extensions"

const mod = new KModule("AutoL", "Player", "Auto send a message when target has been dead.", "", [
    new BooleanSetting("OnlyPlayer", true),
    new TextSetting("Prefix", "@[LB]"),
    new TextArraySetting("Suffix", [
        'string 1',
        'string 2',
        'string 3',
    ])
])

const PlayerEntity = Java.type("net.minecraft.entity.player.PlayerEntity")

const debug = false
const chat = debug ? Client.displayChatMessage : NetworkUtil.sendChatMessage

let target: Entity | undefined = undefined;

mod._attack = (event: { enemy: Entity }) => {
    if (event.enemy instanceof PlayerEntity || !mod.setting('OnlyPlayer')!.value) {
        target = event.enemy;
    }
}

mod._playerTick = () => {
    if (target?.isDead()) {
        // method_5477=getName
        chat(`${mod.setting('Prefix')!.getValue()} ${target.method_5477().getString()} ${mod.setting('Suffix')!.getValue().random()}`)
        target = undefined;
    }
}

new KScript("MyScript", "1.0.0", "KonohaScarlet", mod).init()