# LiquidBounce Script API

LiquidBounce's script API allows the development of custom modules and commands for the client without having to modify its source code. It is based on [GraalJS](https://github.com/oracle/graaljs), an ECMAScript 2023 compliant JavaScript implementation built on [GraalVM](https://www.graalvm.org/). GraalVM's [polyglot functionality](https://www.graalvm.org/latest/reference-manual/polyglot-programming/) enables saemless interoperation between scripts written in JavaScript and the client written in Java and Kotlin. This integration facilitates easy access and utilization of Java's and Minecraft's classes, methods, and fields, making development particularly intuitive for those already familiar with Minecraft modding.

Documentation can be found [on our website](https://liquidbounce.net/docs/ScriptAPI%20(nextgen)/Getting%20Started).

## Structure of this repository

- [/examples](examples): Contains example scripts that may be used as a reference.

## License

All files in this repository are licensed under the [MIT License](LICENSE).