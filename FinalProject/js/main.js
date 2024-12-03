let game = {
    diceState: [
        {dice : document.getElementById("roll1"), hold: false, num : 1},
        {dice : document.getElementById("roll2"), hold: false, num : 1},
        {dice : document.getElementById("roll3"), hold: false, num : 1},
        {dice : document.getElementById("roll4"), hold: false, num : 1},
        {dice : document.getElementById("roll5"), hold: false, num : 1}
    ],
    scoreUpperButtons: [
        {button : "ones", html: document.getElementById("ones"), scoreNumHtml: document.getElementById("score1")},
        {button : "twos", html: document.getElementById("twos"), scoreNumHtml: document.getElementById("score2")},
        {button : "threes", html: document.getElementById("threes"), scoreNumHtml: document.getElementById("score3")},
        {button : "fours", html: document.getElementById("fours"), scoreNumHtml: document.getElementById("score4")},
        {button : "fives", html: document.getElementById("fives"), scoreNumHtml: document.getElementById("score5")},
        {button : "sixes", html: document.getElementById("sixes"), scoreNumHtml: document.getElementById("score6")},
    ],
    scoreLowerButtons: [
        {button : "3Kind", html: document.getElementById("3Kind"), scoreNumHtml: document.getElementById("score3Kind")},
        {button : "fullHouse", html: document.getElementById("fullHouse"), scoreNumHtml: document.getElementById("scoreFH")}
    ],
    dieLow: 1,
    dieHigh: 7,
    maxRolls: 3,
    bonus: false,
    bonusNum: 60,
    gameOver: false,
    numRolls: 0,
}

let scores = {
    ones: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,
    bonus: 35,
    threeOfAKind: 0,
    fullHouse: 0,
    rollNumber: 0,
    totalScore: 0,
    numTimesScored: 0,
};

function save(){
    localStorage.setItem("game", JSON.stringify(game));
    localStorage.setItem("scores", JSON.stringify(scores));
    
}
function load(){
    let gameStr = localStorage.getItem("game");
    let scoresStr = localStorage.getItem("scores");
    game = JSON.parse(gameStr);
    scores = JSON.parse(scoresStr);

    const resetButton = document.getElementById("reset");
    resetButton.style.display = "none";
    resetButton.addEventListener("click",resetGame);

    for(let i = 0; i <game.diceState.length; i++){
        game.diceState[i].dice = document.getElementById(`roll${i + 1}`)
        game.diceState[i].dice.addEventListener("click", ()=> changeDiceState(i, game.diceState[i].hold));
    }
    game.scoreUpperButtons[0].html = document.getElementById("ones");
    game.scoreUpperButtons[1].html = document.getElementById("twos");
    game.scoreUpperButtons[2].html = document.getElementById("threes");
    game.scoreUpperButtons[3].html = document.getElementById("fours");
    game.scoreUpperButtons[4].html = document.getElementById("fives");
    game.scoreUpperButtons[5].html = document.getElementById("sixes");
    for(let i = 0; i < game.scoreUpperButtons.length; i++){
        game.scoreUpperButtons[i].scoreNumHtml = document.getElementById(`score${i+1}`);
        game.scoreUpperButtons[i].html.addEventListener("click", ()=> calcScore(game.scoreUpperButtons[i].button));
    }
    game.scoreLowerButtons[0].html = document.getElementById("3Kind");
    game.scoreLowerButtons[1].html = document.getElementById("fullHouse");
    game.scoreLowerButtons[0].html.addEventListener("click", ()=> calcScore(game.scoreLowerButtons[0].button));
    game.scoreLowerButtons[1].html.addEventListener("click", ()=> calcScore(game.scoreLowerButtons[1].button));

    game.scoreLowerButtons[0].scoreNumHtml = document.getElementById("score3Kind");
    game.scoreLowerButtons[1].scoreNumHtml = document.getElementById("scoreFH");

    const rollButton = document.getElementById("roll");
    rollButton.addEventListener("click", roll);

    const saveButton = document.getElementById("save");
    saveButton.addEventListener("click", save);
    const loadButton = document.getElementById("load");
    loadButton.addEventListener("click", load);

    loadHTML();

}

function loadHTML(){
    for(let i = 0; i < game.diceState.length; i++){
        if(game.diceState[i].hold)
            game.diceState[i].dice.style.backgroundColor = "#e01a59"
        else{
            game.diceState[i].dice.style.backgroundColor = "#63c1a0"
        }
    }
    game.scoreLowerButtons.forEach(button => {
        if (scores[button.button] > 0) {
            button.html.style.display = "none";
            button.scoreNumHtml.style.display = "inline";
            button.scoreNumHtml.innerText = scores[button.button];
        }
        else {
            button.html.style.display = "inline";
            button.scoreNumHtml.style.display = "none";
        }
    });
    if(scores.totalScore < game.bonusNum){
        document.getElementById("bonus").style.backgroundColor = "#ecb32d"
    }
    else{
        document.getElementById("bonus").style.backgroundColor = "#e01a59"
    }
    checkGame();
    document.getElementById("score").innerText = `Total Score: ${scores.totalScore}, Rolls: ${game.numRolls}`;
    for(let i = 0; i < game.diceState.length; i++){
        game.diceState[i].dice.innerText = game.diceState[i].num;
    }


}

function calcScore(type){
    dice = [];
    for(let i = 0; i < game.diceState.length; i++){
        dice.push(game.diceState[i].num);
    }
    if(scores.rollNumber !== 0){
        if (type === "ones") {
            scores.ones = scoreUpper(dice, 1);
            scores.totalScore += scores.ones;
            updateUpperHTML(0, scores.ones);
        } 
        else if (type === "twos") {
            scores.twos = scoreUpper(dice, 2);
            scores.totalScore += scores.twos;
            updateUpperHTML(1, scores.twos);
        } 
        else if (type === "threes") {
            scores.threes = scoreUpper(dice, 3);
            scores.totalScore += scores.threes;
            updateUpperHTML(2,scores.threes);
        } 
        else if (type === "fours") {
            scores.fours = scoreUpper(dice, 4);
            scores.totalScore += scores.fours;
            updateUpperHTML(3,scores.fours);
        } 
        else if (type === "fives") {
            scores.fives = scoreUpper(dice, 5);
            scores.totalScore += scores.fives;
            updateUpperHTML(4,scores.fives);
        } 
        else if (type === "sixes") {
            scores.sixes = scoreUpper(dice, 6);
            scores.totalScore += scores.sixes;
            updateUpperHTML(5,scores.sixes);
        } 
        else if (type === "3Kind") {
            if(!game.bonus){
                alert("Bonus not achieved")
            }
            else{
                scores.threeOfAKind = scoreThreeKind(dice);
                scores.totalScore += scores.threeOfAKind;
                updateLowerHTML(0, scores.threeOfAKind);
            }
        } 
        else if (type === "fullHouse") {
            if(!game.bonus){
                alert("Bonus not achieved")
            }
            else{
                scores.fullHouse = scoreFullHouse(dice);
                scores.totalScore += scores.fullHouse;
                updateLowerHTML(1, scores.fullHouse);
            }
        }
        checkGame();
        
    }
    else{
        alert("Must roll before scoring")
    }

}

function updateUpperHTML(idx, score){
    game.scoreUpperButtons[idx].html.style.display = "none";
    game.scoreUpperButtons[idx].scoreNumHtml.style.display = "inline";
    game.scoreUpperButtons[idx].scoreNumHtml.style.color = "black";
    game.scoreUpperButtons[idx].scoreNumHtml.innerText = score;
    document.getElementById("score").innerText = `Total Score: ${scores.totalScore}, Rolls: ${game.numRolls}`;
    document.getElementById("bonus").innerText = `Bonus: ${scores.bonus} (Target: ${game.bonusNum}), Pts Needed: ${game.bonusNum - scores.totalScore}`
    for(let i = 0; i < game.diceState.length; i++){
        game.diceState[i].hold = false;
        game.diceState[i].dice.style.backgroundColor = "#63c1a0";
    }    
    scores.rollNumber = 0;
    scores.numTimesScored++;
}

function updateLowerHTML(idx, score){
    game.scoreLowerButtons[idx].html.style.display = "none";
    game.scoreLowerButtons[idx].scoreNumHtml.style.display = "inline";
    game.scoreLowerButtons[idx].scoreNumHtml.style.color = "black";
    game.scoreLowerButtons[idx].scoreNumHtml.innerText = score;
    document.getElementById("score").innerText = `Total Score: ${scores.totalScore}, Rolls: ${game.numRolls}`;
    document.getElementById("bonus").innerText = `Bonus: ${scores.bonus} (Target: ${game.bonusNum}), Pts Needed: ${game.bonusNum - scores.totalScore}`
    for(let i = 0; i < game.diceState.length; i++){
        game.diceState[i].hold = false;
        game.diceState[i].dice.style.backgroundColor = "#63c1a0";
    }    
    scores.rollNumber = 0;
    scores.numTimesScored++;
}

function checkGame(){
    if(scores.totalScore >= game.bonusNum && !game.bonus){
        scores.totalScore += scores.bonus;
        game.bonus = true;
        document.getElementById("bonus").style.backgroundColor = "#e01a59"
        document.getElementById("bonus").innerText = `Bonus Achieved! Bonus: ${scores.bonus}`
        document.getElementById("score").innerText = `Total Score: ${scores.totalScore}, Rolls: ${game.numRolls}`;
        
    }
    if(!game.bonus && scores.numTimesScored === 6){
        alert(`Game over, Final Score: ${scores.totalScore}`)
        game.gameOver = true;
    }
    if(game.bonus && scores.numTimesScored === 8){
        alert(`You Win! Final Score: ${scores.totalScore}`)
        game.gameOver = true;
    }
    if(game.gameOver){
        document.getElementById("reset").style.display = "inline";
    }
}

function getDiceCounts(dice){
    const counts = [0,0,0,0,0,0]
    dice.forEach(num => counts[num - 1]++);
    return counts;
}

function scoreUpper(dice, target){
    let total = 0;
    targetNums = dice.filter(num => num === target);
    for(let i = 0; i < targetNums.length; i++){
        total += targetNums[i];
    }
    return total;
}


function scoreThreeKind(dice){
    let total = 0;
    const counts = getDiceCounts(dice);
    let hasThreeKind = false;
    for(let i = 0; i < counts.length; i++){
        if(counts [i] >= 3)
            hasThreeKind = true;
    }
    if (hasThreeKind)
        total = 30
    return total;
}

function scoreFullHouse(dice){
    let total = 0;
    const counts = getDiceCounts(dice);
    const hasThree = counts.includes(3);
    const hasTwo = counts.includes(2);
    if(hasThree && hasTwo){
        total += 40;
    }
    return total;
}


function changeDiceState(idx, state){
    if(game.numRolls === 0){
        alert("Cannot save, you have not rolled yet")
    }
    else{
        if(state){
            alert("Cannot change die once it is being held")
        }
        else{
            game.diceState[idx].hold = true;
            game.diceState[idx].dice.style.backgroundColor = "#e01a59"
        }
    }

}

function resetGame(){
    for(let i = 0; i < game.diceState.length; i++){
        game.diceState[i].hold = false;
        game.diceState[i].num = 1;
    }
    game.gameOver = false;
    game.bonus = false;
    game.numRolls = 0;
    scores.ones = 0;
    scores.twos = 0;
    scores.threes = 0;
    scores.fours = 0;
    scores.fives = 0;
    scores.sixes = 0;
    scores.fullHouse = 0;
    scores.threeOfAKind = 0;
    scores.rollNumber = 0;
    scores.totalScore = 0;
    scores.numTimesScored = 0;
    for(let i = 0; i < game.scoreLowerButtons.length; i++){
        game.scoreLowerButtons[i].scoreNumHtml.style.display = "none";
        game.scoreLowerButtons[i].html.style.display = "inline";
    }
    for(let i = 0; i < game.scoreUpperButtons.length; i++){
        game.scoreUpperButtons[i].scoreNumHtml.style.display = "none";
        game.scoreUpperButtons[i].html.style.display = "inline";
    }
    document.getElementById("bonus").style.backgroundColor = "#ecb32d";
    document.getElementById("reset").style.display = "none";
    document.getElementById("score").innerText = `Total Score: ${scores.totalScore}, Rolls: ${game.numRolls}`;
    document.getElementById("bonus").innerText = `Bonus: 0 (Target: ${game.bonusNum}), Pts Needed: ${game.bonusNum - scores.totalScore}`

}

function roll(){
    if(scores.rollNumber > 2){
        alert("Cannot roll, must score")
    }
    else{
        for(let i = 0; i < game.diceState.length; i++){
            if(game.diceState[i].hold === false){
                game.diceState[i].num = Math.floor(Math.random() * (game.dieHigh - game.dieLow) + game.dieLow)
                game.diceState[i].dice.innerText = game.diceState[i].num;
            }
        }
        scores.rollNumber++;
        game.numRolls++;
        document.getElementById("score").innerText = `Total Score: ${scores.totalScore}, Rolls: ${game.numRolls}`
    }
    
}

document.addEventListener("DOMContentLoaded", function(){
    const resetButton = document.getElementById("reset");
    resetButton.style.display = "none";
    resetButton.addEventListener("click",resetGame);
    
    for(let i = 0; i < game.diceState.length; i++){
        game.diceState[i].dice.addEventListener("click", ()=> changeDiceState(i, game.diceState[i].hold));
    }

    for(let i = 0; i < game.scoreUpperButtons.length; i++){
        game.scoreUpperButtons[i].html.addEventListener("click", ()=> calcScore(game.scoreUpperButtons[i].button));
    }
    
    game.scoreLowerButtons[0].html.addEventListener("click", ()=> calcScore(game.scoreLowerButtons[0].button));
    game.scoreLowerButtons[1].html.addEventListener("click", ()=> calcScore(game.scoreLowerButtons[1].button));
    
    const rollButton = document.getElementById("roll");
    rollButton.addEventListener("click", roll);

    const saveButton = document.getElementById("save");
    saveButton.addEventListener("click", save);
    const loadButton = document.getElementById("load");
    loadButton.addEventListener("click", load);
    
})
