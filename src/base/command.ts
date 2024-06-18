import { KClass } from "./base";

export class KCommand extends KClass {
    constructor(
        public name: string,
        public aliases?: string[],
        public paramters?: CommandParamterObject[],
        public hub?: boolean,
        public subcommands?: KCommand[],
    ) {
        super();
    }

    onExecute?: (...args: any) => any

    init() {
        const entries = Object.fromEntries(Object.entries(this));
        entries.subcommands = this.subcommands?.map(m => m.init());
        return entries as CommandObject;
    }
}
