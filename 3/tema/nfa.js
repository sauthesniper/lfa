// nfa.js
// Autor: POPA STEFAN LIVIU OCTAVIAN
// Grupa: 151
// Limbaj: JavaScript 

const fs = require("fs");
const { parseConfig } = require("./dfa");

function validateNFA({ sigma, states, startState, finalStates, transitions }) {
    // Trebuie sa existe start state
    if (!startState) {
        console.error("Lipseste start state!");
        return false;
    }

    // Tranzitiile tre sa fie valide, sa existe, si sa aibe tranzitii cu simboluri din alfabet.
    for (const [from, symbol, to] of transitions) {
        if (!states.has(from) || !states.has(to)) {
            console.error(`Starea "${from}" sau "${to}" nu exista in lista de stari!`);
            return false;
        }
        if (!sigma.has(symbol)) {
            console.error(`Simbolul "${symbol}" nu exista!`);
            return false;
        }
    }

    if (finalStates.size === 0) {
        console.warn("Nu are stari finale!");
        return false;
    }

    return true;
}

function testStringNFA({ startState, finalStates, transitions }, input) {
    // Stari curente posibile (la inceput doar startState)
    let currentStates = new Set([startState]);

    for (const symbol of input) {
        const nextStates = new Set();
        // Din fiecare stare curenta, adaugam toate tranzitiile care se potrivesc cu un simbol.
        for (const st of currentStates) {
            for (const [from, sym, to] of transitions) {
                if (from === st && sym === symbol) {
                    nextStates.add(to);
                }
            }
        }
        currentStates = nextStates;
        if (currentStates.size === 0) {
            // Automatul a ramas cu 0 stari curente
            return false;
        }
    }

    // daca o stare curenta este finala, atunci se accepta
    for (const st of currentStates) {
        if (finalStates.has(st)) {
            return true;
        }
    }
    return false;
}

module.exports = {
    parseConfig,
    validateNFA,
    testStringNFA
};
