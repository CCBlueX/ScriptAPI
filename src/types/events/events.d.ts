declare type EventName = 'enable' | 'disable' | string

// TODO: specify events
declare type EventHandler<T extends EventName> = (...args: any[]) => any

