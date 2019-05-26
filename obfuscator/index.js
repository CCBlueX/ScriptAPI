const obfuscator = require("javascript-obfuscator");
const fs = require("fs");
const path = require("path");

const config = require(path.join(__dirname, "config.json"));

let inputFiles = [];
fs.readdirSync(path.join(__dirname, "in")).forEach(fileName => {
    if (!fileName.startsWith(".")) {
        console.log(`Reading ${fileName}`);

        let file = {
            name: fileName,
            content: fs.readFileSync(path.join(__dirname, "in", fileName)).toString()
        }

        inputFiles.push(file);
    }
});

for (let input of inputFiles) {
    console.log(`Obfuscating ${input.name}...`);
    let obfuscated = obfuscator.obfuscate(input.content, config);

    console.log("Evaluating hex numbers...");
    let hexNumbers = obfuscated._obfuscatedCode.match(/0[xX][0-9a-fA-F]+/g);
    for (let number of hexNumbers) {
        obfuscated._obfuscatedCode = obfuscated._obfuscatedCode.replace(number, eval(number).toFixed(1));
    }

    fs.writeFileSync(path.join(__dirname, "out", input.name), obfuscated);
}

console.log("Done");