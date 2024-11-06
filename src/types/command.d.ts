declare type Validator = (arg: string) => { accept: true, value: any } | { accept: false, error: string }

declare interface CommandParamterObject {
    name: string
    required?: boolean
    vararg?: boolean
    getCompletions?: (begin: string, args: string[]) => string[]
    validate?: Validator
}

declare interface CommandObject {
    name: string
    onExecute: (...args: string[]) => void
    aliases?: string[]
    paramters?: CommandParamterObject[]
    hub?: boolean
    subcommands?: CommandObject[]
}

