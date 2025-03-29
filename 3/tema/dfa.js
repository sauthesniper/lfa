// dfa.js
// Autor: POPA STEFAN LIVIU OCTAVIAN
// Grupa: 151
// Limbaj: JavaScript 
const fs = require("fs");

function parseConfig(path) {
    const lines = fs.readFileSync(path, "utf-8").split(/\r?\n/);
    let section = null;

    const sigma = new Set();
    const states = new Set();
    let startState = null;
    const finalStates = new Set();
    const transitions = [];

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed === "" || trimmed.startsWith("#")) {
            continue;
        }
        if (trimmed === "Sigma:") {
            section = "sigma";
            continue;
        } else if (trimmed === "States:") {
            section = "states";
            continue;
        } else if (trimmed === "Transitions:") {
            section = "transitions";
            continue;
        } else if (trimmed === "End") {
            section = null;
            continue;
        }
        switch (section) {
            case "sigma": {
                sigma.add(trimmed);
                break;
            }
            case "states": {
                const parts = trimmed.split(",").map(s => s.trim());
                const stateName = parts[0];
                states.add(stateName);

                // Start sau Final
                if (parts.includes("S")) {
                    if (startState) {
                        throw new Error("Automatul nu poate avea mai multe stari de start!");
                    }
                    startState = stateName;
                }
                if (parts.includes("F")) {
                    finalStates.add(stateName);
                }
                break;
            }
            case "transitions": {
                const [from, symbol, to] = trimmed.split(",").map(s => s.trim());
                transitions.push([from, symbol, to]);
                break;
            }
        }
    }

    return { sigma, states, startState, finalStates, transitions };
}

function validateDFA({ sigma, states, startState, finalStates, transitions }) {
    // Exista starea de start
    if (!startState) {
        console.error("Lipseste starea de start!");
        return false;
    }

    //Tranzitiile trebuie sa fie valide si sa nu existe tranzitie prin acelasi simbol de 2 ori dintr-o stare
    const seen = new Set();
    for (const [from, symbol, to] of transitions) {
        if (!states.has(from) || !states.has(to)) {
            console.error(`Starea "${from}" sau "${to}" nu exista!`);
            return false;
        }
        if (!sigma.has(symbol)) {
            console.error(`Simbolul "${symbol}" nu exista!`);
            return false;
        }

        const key = `${from},${symbol}`;
        if (seen.has(key)) {
            console.error(
              `Tranzitie multipla de la "${from}" cu simbolul "${symbol}"`
            );
            return false;
        }
        seen.add(key);
    }

    //Exista stare finala
    if (finalStates.size === 0) {
        console.error(
            `Nu exista stare finala`
          );
          return false;
    }

    return true;
}

function testStringDFA({ startState, finalStates, transitions }, input) {
    let currentState = startState;

    for (const symbol of input) {
        const next = transitions.find(([from, sym]) => from === currentState && sym === symbol);
        if (!next) {
            // Nu exista nicio tranzitie definita.
            return false;
        }
        currentState = next[2];
    }

    // Este starea in care am ajuns una finala?
    return finalStates.has(currentState);
}
module.exports = {
    parseConfig,
    validateDFA,
    testStringDFA
};
