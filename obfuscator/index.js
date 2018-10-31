const obfuscator = require("javascript-obfuscator");
const fs = require("fs");
const path = require("path");

const config = require(path.join(__dirname, "config.json"));

console.log("Reading input file...");
const input = fs.readFileSync(path.join(__dirname, "in", "input.js")).toString();

console.log("Obfuscating...");
var obfuscationResult = obfuscator.obfuscate(input, config);

console.log("Writing output file...");
fs.writeFileSync(path.join(__dirname, "out", "output.js"), obfuscationResult._obfuscatedCode);
console.log("Done");