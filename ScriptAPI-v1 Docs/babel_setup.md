<a href="https://babeljs.io/"><img src="https://liquidbounce.net/img/docs/babel.png" width="400" height="auto"></a>
## Setting up Babel
When writing scripts for LiquidBounce's ScriptAPI, you are restricted by the fact that [Nashorn](https://docs.oracle.com/javase/9/nashorn/nashorn-java-api.htm#JSNUG112), the script engine used, only supports JavaScript up to version ES5. In other words, many features that were introduced in newer revisions of the language are not natively supported by the client.

There are two ways of dealing with this situation. 
1. You accept the limitations and actively work around them.
2. You use a so-called transpiler to adapt modern JavaScript in a way that it can be understood by older script engines.

The latter is certainly the more beautiful variant and to be recommended.

### What is Babel?
[Babel](https://babeljs.io/) is essentially a tool that lets you stick a script with modern language features in the front and a version of the same script comes out in the back, but adapted to be compatible with an earlier definition of JavaScript. In reality it can do much more, but this should be enough as a basis for the time being. If you want to learn more about how Babel works, I recommend you check out the respective [Wikipedia article](https://en.wikipedia.org/wiki/Babel_(transcompiler)).

### Setup
Setup is very straightforward. Just follow the steps below and you should be able to use modern JavaScript in LiquidBounce scripts in no time.
1. Download the latest version of [NodeJS](https://nodejs.org/en/) and install it on your computer.
2. Create a new folder in which you want to setup your ScriptAPI project.
3. Now create a file named `package.json` in that folder, open it in a text editor and insert the following:
```json
{
    "name": "scriptapi-transpiler",
    "version": "1.0.0",
    "description": "Transpiles modern language features to ES5 compliant JavaScript.",
    "main": "",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "./node_modules/.bin/babel src --out-dir dist"
    },
    "author": "CCBlueX",
    "license": "MIT",
    "devDependencies": {
        "@babel/cli": "^7.8.4",
        "@babel/core": "^7.9.0",
        "@babel/preset-env": "^7.9.0"
    },
    "dependencies": {
        "@babel/polyfill": "^7.8.7"
    }
}
```
4. Now create another file, name it `babel.config.json` and paste the following into it:
```json
{
    "presets": [
        [
            "@babel/env"
        ]
    ]
}
```
5. Now open a console window in the folder (e.g. on Windows CMD) and install all required libraries by running `npm install`.
6. Finally create two folders. The first one you name `src`, the second one `dist`. Your code goes into the source folder and the transpiled version will land in the dist directory.

### Transpiling
Transpiling is very easy. Just once again open a console window in your project folder and run `npm run build`. Afterwards the transpiled version of your script can be found in the folder named dist. These files are now compatible with LiquidBounce and can be released.

### Example code
The following sample code uses modern JavaScript features and normally could not be executed by LiquidBounce. 
```js
const scriptName = "Test";
const scriptVersion = 1.0;
const scriptAuthor = "Senk Ju";

class BabelModule {

    constructor() {
        this.name = "Senk Ju";
    }

    getName() {
        return "BabelModule";
    }

    getDescription() {
        return "This module is using modern JavaScript features which have been transpiled to ES5 compliant code.";
    }

    getCategory() {
        return "Misc";
    }

    onEnable() {
        // String interpolation
        chat.print(`Hello, my name is ${this.name}!`);

        // Constants
        const array = ["This", "is", "an", "array"];

        // Block-scoped variable
        let axolotl = true;

        // Destructuring
        const [var1, var2, var3, var4] = array;
        chat.print(var1);

        // For-of loop
        for (const element of array) {
            chat.print(element);
        }

        // Arrow functions
        array.filter(element => element.length < 3)
            .forEach(element => {
                chat.print(element.length);
            });
    }
}

const babelModule = new BabelModule();

function onEnable() {
    moduleManager.registerModule(babelModule);
}

function onDisable() {
    moduleManager.unregisterModule(babelModule);
}
```