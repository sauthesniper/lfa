// test_nfa.js
// Rulează: node test_nfa.js

const { parseConfig, validateNFA, testStringNFA } = require("./nfa");
const config = parseConfig("config_nfa.txt");

console.log("Este NFA valid?", validateNFA(config));

// inputs
const inputs = ["", "a", "aa", "ab", "bbb", "aab", "abbb"];

for (const inp of inputs) {
    const accepted = testStringNFA(config, inp);
    console.log(`Input: ${inp || "ε"} => ${accepted ? "ACCEPTAT" : "RESPINS"}`);
}
