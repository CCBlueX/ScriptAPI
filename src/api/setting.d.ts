declare class Value<T> {
    name: string;
    value: T;
    getValue(): T;
    setValue(): T;
}

declare class Setting {
    static boolean(value: BooleanSettingObject): Value<boolean>
    static float(value: FloatSettingObject): Value<number>
    static floatRange(value: FloatRangeSettingObject): Value<[number, number]>
    static int(value: IntSettingObject): Value<number>
    static intRange(value: IntRangeSettingObject): Value<[number, number]>
    static key(value: KeySettingObject): Value<number>
    static text(value: TextSettingObject): Value<string>
    static textArray(value: TextArraySettingObject): Value<string[]>
    static choose(value: ChooseSettingObject): Value<string>
}
