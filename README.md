# LiquidBounce Script API with TypeScript

LiquidBounce's script API allows the development of custom modules and commands for the client without having to modify its source code. It is based on [GraalJS](https://github.com/oracle/graaljs), an ECMAScript 2023 compliant JavaScript implementation built on [GraalVM](https://www.graalvm.org/). GraalVM's [polyglot functionality](https://www.graalvm.org/latest/reference-manual/polyglot-programming/) enables saemless interoperation between scripts written in JavaScript and the client written in Java and Kotlin. This integration facilitates easy access and utilization of Java's and Minecraft's classes, methods, and fields, making development particularly intuitive for those already familiar with Minecraft modding.

Documentation can be found [on our website](https://liquidbounce.net/docs/Script%20API/Creating%20Modules).

Welcome for providing interfaces!

## Structure of this repository

## Get Started

This is a [Node.js](https://nodejs.org/) project, so you need it to complie `.ts` files to `.js` files which can be used in game.

- Open the folder with [VS Code](https://code.visualstudio.com/) or some other editors you prefer.
- Run `npm install` for libs.
- Edit [index.ts](src/index.ts) .
- Run `npm run build` to complie with webpack.
- Result: [output.js](dist/output.js) .

You can use vanilla coding styles or OOP styles with classes started with `K`. 

### Vanilla Examples

- [/examples](examples): Contains example scripts that may be used as a reference.

### OOP Examples

- [index.ts](src/index.ts): 1 Module example.

## License

All files in this repository are licensed under the [MIT License](LICENSE).
