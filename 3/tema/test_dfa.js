// test_dfa.js
// node test_dfa.js

const { parseConfig, validateDFA, testStringDFA } = require("./dfa");
const config = parseConfig("config_dfa.txt");

console.log("Este DFA valid?", validateDFA(config));

// inputs
const inputs = ["0", "01", "001", "1010", "111", "010"];

for (const inp of inputs) {
    const accepted = testStringDFA(config, inp);
    console.log(`Input: ${inp} => ${accepted ? "ACCEPTAT" : "RESPINS"}`);
}
