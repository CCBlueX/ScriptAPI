import { KClass } from "./base";
import { KCommand } from "./command";
import { KModule } from "./module";

export class KScript extends KClass {
    public modules: KModule[];
    public commands: KCommand[];

    constructor(
        public name: string,
        public version: string,
        public authors: string | string[],
        ...args: (KModule | KCommand)[]
    ) {
        super();
        this.modules = args.filter(it => it instanceof KModule) as KModule[];
        this.commands = args.filter(it => it instanceof KCommand) as KCommand[];
    }

    init() {
        const script = registerScript({
            name: this.name,
            version: this.version,
            authors: this.authors,
        });
        this.modules.map(m => m.init())
            .forEach(m => {
                script.registerModule(m as ModuleObject, (mod) =>
                    Object.entries(m)
                        .filter(([key]) => key.startsWith('_'))
                        .forEach(([key, value]) => mod.on(key.slice(1), value)))
            });
        this.commands.map(m => m.init()).forEach(m => script.registerCommand(m));
        return script;
    }
}
