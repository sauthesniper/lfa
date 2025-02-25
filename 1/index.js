let input='10111';
let states=['q1','q2','q3','q4'];
let transitions=[['q1','q2','1'], 
                ['q1','q1','0'],
                ['q1','q2','1'], 
                ['q2','q2','1'], 
                ['q2','q3','0'], 
                ['q3','q3','0'], 
                ['q3','q4','1'], 
                ['q4','q2','0'], 
                ['q4','q1','1'], 
            ];
let initialState='q1';
let finalStates=['q4'];
let currentState=initialState;
let parcurs=true;
for(let i=0;i<input.length;i++){
    let currentCommand=input[i];
    let foundNext=false;
    for (let j=0;j<transitions.length;j++){
        if (transitions[j][0]==currentState && transitions[j][2]==currentCommand){
            currentState=transitions[j][1]
            foundNext=true;
            break;
        }
    }
    if (foundNext==false) {
        console.log("Automat invalid");
        parcurs=false;
    }
}
if (finalStates.includes(currentState) && parcurs==true){
    parcurs=true;
}else{
    parcurs=false;
}
console.log(parcurs);