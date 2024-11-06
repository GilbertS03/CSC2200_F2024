const ui = {

}

const game = {
    rules : [
        {id : 0, item: 'rock', img : 'rock.PNG', beats : "scissors"},
        {id : 1, item: 'paper', img : 'paper.PNG', beats : "rock"},
        {id : 2, item: 'scissors', img : 'scissors.PNG', beats : "paper"},
    ],
    state : {
        wins : 0,
        losses : 0,
        draws : 0
    },
    messages: {
        win : "Winner!",
        loss : "Loser Loser!",
        draw : "Draw!"
    },
    getRandomInt : function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    evaluateResults(cPickObj, uPickObj){
        if(uPickObj.beats === cPickObj.item){
            this.state.wins++;
            return this.messages.win;
        }
        else if(cPickObj.beats === uPickObj.item){
            this.state.losses++;
            return this.messages.loss;
        }
        else{
            this.state.draws++;
            return this.messages.draw;
        }
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("mainButton").addEventListener("click", event=>{
        const cPick = game.getRandomInt(0,2)
        const cObj = game.rules[cPick]; //Returns the row of the cPick
        const uPickIndex = document.getElementById("sel1").value;
        const uObj = game.rules[uPickIndex];

        const resultMessage = game.evaluateResults(cObj, uObj);
        console.log(cObj)
        console.log(uObj);
        console.log("resultMessage: " + resultMessage)
    })
})