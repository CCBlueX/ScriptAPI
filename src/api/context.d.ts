// import { CommandObject, Validator } from "../types/command"
// import { EventName, EventHandler } from "../types/events/events"
// import { ModuleObject, ModuleSettingsObject } from "../types/module"
// import { ScriptObject } from "../types/script"

declare const mc: Minecraft

declare class Client {
    static getEventManager(): any
    static getConfigSystem(): any
    static getModuleManager(): any
    static getCommandManager(): any
    static getScriptManager(): any
    static getCombatManager(): any

    static displayChatMessage(text: string): void
}

declare const registerScript: (script: ScriptObject) => Script

declare class Script {
    registerModule(module: ModuleObject, callback: (module: Module) => any): Script
    registerCommand(command: CommandObject): Script
    // TODO: registerChoice
}

declare class Module {
    settings: ModuleSettingsObject
    on<T extends EventName>(eventName: T, callback: EventHandler<T>): void
}

// Utils

declare class RotationUtil {
    static newRaytracedRotationEntity(entity: Entity, range: number, throughWallsRange: number): Rotation | null

    static newRotationEntity(entity: Entity): Rotation

    static aimAtRotation(rotation: Rotation, fixVelocity: boolean): void
}

declare class ItemUtil {
    static create(arguments: string, amount?: number): ItemStack
}

declare class NetworkUtil {
    static movePlayerGround(onGround: boolean): void

    static movePlayerPosition(x: number, y: number, z: number, onGround: boolean): void

    static movePlayerPositionAndLook(x: number, y: number, z: number, yaw: number, pitch: number, onGround: boolean): void

    static movePlayerLook(yaw: number, pitch: number, onGround: boolean): void

    static sendChatMessage(message: string): void

    static sendCommand(command: string): boolean
}

declare class InteractionUtil {
    static attackEntity(entity: Entity, swing: boolean, keepSprint: boolean): void

    static interactEntity(entity: Entity, hand: Hand): void

    static useItem(hand: Hand): void

    static placeBlock(blockPos: BlockPos, hand: Hand): boolean
}

declare class BlockUtil {
    static newBlockPos(x: number, y: number, z: number): BlockPos

    static getBlock(blockPos: BlockPos): Block

    static getState(blockPos: BlockPos): BlockState | null
}

declare class MovementUtil {
    static getSpeed(): number

    static isMoving(): boolean

    static strafe(): void

    static strafeWithSpeed(speed: number): void

    static strafeWithStrength(strength: number): void

    static strafeWithSpeedAndStrength(speed: number, strength: number): void
}

declare class ReflectionUtil {
    static classByName(name: string): JavaClass
    
    static classByObject(object: any): JavaClass

    static newInstance(clazz: JavaClass, ...args: Array<any>): any

    static newInstanceByName(name: string, ...args: Array<any>): any

    static newInstanceByObject(object: any, ...args: Array<any>): any

    static getField(object: any, name: string): any

    static getStaticField(clazz: JavaClass, name: string): any

    static invokeMethod(object: any, name: string, ...args: Array<any>): any

    static invokeStaticMethod(clazz: JavaClass, name: string, ...args: Array<any>): any
}

declare class ParameterValidator {
    static string: Validator
    static module: Validator
    static integer: Validator
    static positiveInteger: Validator
}

declare class UnsafeThread {
    static run(callback: () => void): Thread
}
