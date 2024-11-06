declare interface ModuleSettingObject<T> {
    name: string
    default: T
}

declare interface BooleanSettingObject extends ModuleSettingObject<boolean> {}

declare interface FloatSettingObject extends ModuleSettingObject<number> {
    range: [number, number]
    suffix?: string
}

declare interface FloatRangeSettingObject extends ModuleSettingObject<[number, number]> {
    range: [number, number]
    suffix?: string
}

declare interface IntSettingObject extends ModuleSettingObject<number> {
    range: [number, number]
    suffix?: string
}

declare interface IntRangeSettingObject extends ModuleSettingObject<[number, number]> {
    range: [number, number]
    suffix?: string
}

declare interface KeySettingObject extends ModuleSettingObject<number> {}

declare interface TextSettingObject extends ModuleSettingObject<string> {}

declare interface TextArraySettingObject extends ModuleSettingObject<string[]> {}

declare interface ChooseSettingObject extends ModuleSettingObject<string> {
    choices: string[]
}

declare interface ModuleSettingsObject {
    [key: string]: Value<any>
}

declare type ModuleCategory = "Combat" | "Client" | "Combat" | "Exploit" | "Fun" | "Misc" | "Movement" | "Player" | "Render" | "World"

declare interface ModuleObject {
    name: string
    category: ModuleCategory
    description?: string
    tag?: string
    settings?: ModuleSettingsObject
}
