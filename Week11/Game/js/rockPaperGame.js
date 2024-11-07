const ui = {
    displayImage: function(pickObj, disId) {
        const imgHtml = `<img src='imgs/${pickObj.img}' width='100px' alt="${pickObj.item}"'>`;
        document.getElementById(disId).innerHTML = imgHtml;
    },
    updateDisplayObj: function(msgObj, disId) {
        let inHTML  = msgObj.msg;
        inHTML += `<img src='imgs/${msgObj.img}' width='100px' alt="${msgObj.alt}"'>`;
        document.getElementById(disId).innerHTML = inHTML;
    },
    updateDisplayValue: function(msg, disId) {
        // let inHTML  = msgObj.msg;
        // inHTML += `<br /><img src='imgs/${msgObj.img}' width='100px' alt="${msgObj.alt}"'>`;
        document.getElementById(disId).innerHTML = msg;
    },
    updateStatsDisplay: function(state) {
        this.updateDisplayValue(state.wins, "wins");
        this.updateDisplayValue(state.losses, "loss");
        this.updateDisplayValue(state.draws, "draws");
        this.updateDisplayValue(state.bet, "tWins")
    },
};

const game = {
    rules: [
        { id: 0, item: 'rock', beats: 'scissors', img: 'rock.PNG' },
        { id: 1, item: 'paper', beats: 'rock', img: 'paper.PNG' },
        { id: 2, item: 'scissors', beats: 'paper', img: 'scissors.PNG' }
    ],
    state: {
        wins: 0,
        losses: 0,
        draws: 0,
        bet: 0,
    },
    messages: {
        reset:{msg: "Winner Loser results!", img: 'homer.jpg', alt:"Homer"},
        win: {msg : "Winner!", img : 'homerWin.jpg', alt:"Homer Wins!"},
        loss: {msg : "Loser!", img: 'homerLoss.png', alt:"Homer Loss!"},
        draw: {msg : "Draw!", img: 'homerTied.png', alt : "Homer Tied up!"}
    },
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    evaluateResult: function(cPickObj, uPickObj) {
        let bet = this.setBet();

        if (uPickObj.beats === cPickObj.item) {
            this.state.wins++;
            bet *= 2;
            console.log(bet)
            game.state.bet += bet;
            return this.messages.win;
        } else if (cPickObj.beats === uPickObj.item) {
            this.state.losses++;
            console.log(bet)
            return this.messages.loss;
        } else {
            this.state.draws++;
            game.state.bet += bet;
            console.log(bet)
            return this.messages.draw;
        }
    },
    setBet: function(){
        const max = 50;
        const min = 0;
        let temp = parseInt(document.getElementById("bet").value);
        if (temp > max || temp < min){
            alert(`Cannot be greater than ${max} or less than ${min}`);
            temp = 0;
        }
        else if(isNaN(temp)){
            alert("Must be a value in the box")
            temp = 0;
        }
        else{
            game.state.bet -= temp;
        }
        return temp;
    }
};

function reset(){
    const resObj = game.messages.reset;
    game.state.wins = 0;
    game.state.losses = 0;
    game.state.draws = 0;
    game.state.bet = 0;
    document.getElementById("bet").value = 0;
    ui.updateStatsDisplay(game.state);
    ui.updateDisplayObj(resObj, "resArea");
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("homerResults").innerHTML = document.getElementById("homerResults").innerHTML + `<img src="imgs/homer.jpg" alt="homer">`
    document.getElementById("reset").addEventListener("click", reset);
    document.getElementById("mainButton").addEventListener("click", function() {
        if(game.state.bet <= -100){
            alert("Loser!")
            reset();
        }
        else if(game.state.bet >= 100){
            alert("Winner!");
            reset();
        }
        else{
            const cPickIndex = game.getRandomInt(0, 2);
            const cPickObj = game.rules[cPickIndex];
            ui.displayImage(cPickObj, "cPick");

            const uPickIndex = parseInt(document.getElementById("sel1").value);
            const uPickObj = game.rules[uPickIndex];
            ui.displayImage(uPickObj, "uPick");

            const resultObj = game.evaluateResult(cPickObj, uPickObj);
            // document.getElementById("resArea").innerHTML = resultMessage;
            ui.updateDisplayObj(resultObj, "resArea");
            ui.updateStatsDisplay(game.state); // Call to update all stats

        }
    });
});
