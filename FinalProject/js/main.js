let game = {
    diceState: [
        {dice : document.getElementById("roll1"), hold: false},
        {dice: document.getElementById("roll2"), hold: false },
        {dice : document.getElementById("roll3"), hold: false },
        {dice : document.getElementById("roll4"), hold: false },
        {dice : document.getElementById("roll5"), hold: false },

    ]
}

let user = {
    score : 0,

}

function changeDiceState(idx, state){

    if(state){
        game.diceState[idx].hold = false;
        game.diceState[idx].dice.style.backgroundColor = "#e01a59"
    }
    else{
        game.diceState[idx].hold = true;
        game.diceState[idx].dice.style.backgroundColor = "#63c1a0"
    }

    console.log(game.diceState[idx].hold);

}

function roll(){

}

document.addEventListener("DOMContentLoaded", function(){
    for(let i = 0; i < game.diceState.length; i++){
        // game.diceState[i].dice.addEventListener("click", ()=> changeDiceState(i, game.diceState[i].hold));
        console.log(game.diceState[i]);
    }
    d1 = document.getElementById("roll1");
    console.log(d1);
    d1.addEventListener("click", ()=>changeDiceState(0, false))
    console.log(d1)
    const ones = document.getElementById("ones");
    const twos = document.getElementById("twos");
    const threes = document.getElementById("threes");
    const fours = document.getElementById("fours");
    const fives = document.getElementById("fives");
    const sixes = document.getElementById("sixes");
    const threeKind = document.getElementById("3Kind");
    const fullHouse = document.getElementById("FullHouse");
    const roll = document.getElementById("roll");
    const save = document.getElementById("save");
    const load = document.getElementById("load");
})