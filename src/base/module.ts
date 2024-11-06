import { KClass } from "./base";

class ModuleSetting<T> extends KClass {
    protected constructor(public name: string, public defaultValue: T, public valueType: ValueType) {
        super();
    }

    init<T>() {
        const object = Object.fromEntries(Object.entries(this));
        object['default'] = object['defaultValue'];
        delete object['defaultValue'];
        return object as ModuleSettingObject<T>;
    }
}

type ValueType = "boolean" | "float" | "floatRange" | "int" | "intRange" | "key" | "text" | "textArray" | "choose";

export class BooleanSetting extends ModuleSetting<boolean> {
    constructor(
        name: string,
        defaultValue: boolean,
    ) {
        super(name, defaultValue, 'boolean');
    }
}

export class FloatSetting extends ModuleSetting<number> {
    constructor(
        name: string,
        defaultValue: number,
        public range: [number, number],
        public suffix?: string
    ) {
        super(name, defaultValue, 'float');
    }
}

export class FloatRangeSetting extends ModuleSetting<number> {
    constructor(
        name: string,
        defaultValue: number,
        public range: [number, number],
        public suffix?: string
    ) {
        super(name, defaultValue, 'floatRange');
    }
}

export class IntSetting extends ModuleSetting<number> {
    constructor(
        name: string,
        defaultValue: number,
        public range: [number, number],
        public suffix?: string
    ) {
        super(name, defaultValue, 'int');
    }
}

export class IntRangeSetting extends ModuleSetting<number> {
    constructor(
        name: string,
        defaultValue: number,
        public range: [number, number],
        public suffix?: string
    ) {
        super(name, defaultValue, 'intRange');
    }
}

export class KeySetting extends ModuleSetting<number> {
    constructor(
        name: string,
        defaultValue: number,
    ) {
        super(name, defaultValue, 'key');
    }
}

export class TextSetting extends ModuleSetting<string> {
    constructor(
        name: string,
        defaultValue: string,
    ) {
        super(name, defaultValue, 'text');
    }
}

export class TextArraySetting extends ModuleSetting<string[]> {
    constructor(
        name: string,
        defaultValue: string[],
    ) {
        super(name, defaultValue, 'textArray');
    }
}

export class ChooseSetting extends ModuleSetting<string> {
    constructor(
        name: string,
        defaultValue: string,
        public choices: string[]
    ) {
        super(name, defaultValue, 'choose');
    }
}

export class KModule extends KClass {
    public settings?: ModuleSettingsObject
    constructor(
        public name: string,
        public category: ModuleCategory,
        public description?: string,
        public tag?: string,
        public settingsArray?: ModuleSetting<any>[],
    ) {
        super();
        this.settings = this.settingsArray?.reduce((acc, it) => {
            // @ts-ignore
            // TODO: resolve this...
            acc[it.name] = Setting[it.valueType](it.init())
            return acc;
        }, {} as ModuleSettingsObject)
    }

    [key: `_${EventName}`]: EventHandler<EventName> | undefined

    init() {
        return Object.fromEntries(Object.entries(this))
    }

    setting(name: string) {
        return this.settings?.[name]
    }
}

