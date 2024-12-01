const game = {
    correctCode: [2, 7, 4], // Correct code for the bomb
    currentGuess: [],       // The current guess made by the player
    feedback: '',           // Feedback for the current guess
    gameOver: false,        // Flag to track if the game is over
    gameState: {
        attemptsLeft: 4,
        backgroundColors: ['transparent', 'red', 'orange', 'yellow', 'green'],
        isBombDefused: false,
    },

    init: function() {
        this.gameState.attemptsLeft = 4;
        this.currentGuess = [];
        this.feedback = '';
        this.gameOver = false;
        this.gameState.isBombDefused = false;

        document.getElementById('message').textContent = "";
        document.getElementById('feedback').innerHTML = "";
        document.getElementById('bomb').style.color = this.gameState.backgroundColors[this.gameState.attemptsLeft];
        this.updateAttemptsLeft();
    },
    updateAttemptsLeft: function() {
        const attemptsDisplay = document.getElementById('attempts-left');
        attemptsDisplay.textContent = `Attempts Left: ${this.gameState.attemptsLeft}`;
        attemptsDisplay.style.backgroundColor = this.gameState.backgroundColors[this.gameState.attemptsLeft];
        document.getElementById('bomb').style.color = this.gameState.backgroundColors[this.gameState.attemptsLeft];
    },
    disableCorrectDigits: function() {
        // Disable input fields for correct digits
        if (game.currentGuess[0] === game.correctCode[0]) {
            document.getElementById('digit1').disabled = true;
        }
        if (game.currentGuess[1] === game.correctCode[1]) {
            document.getElementById('digit2').disabled = true;
        }
        if (game.currentGuess[2] === game.correctCode[2]) {
            document.getElementById('digit3').disabled = true;
        }
    },
    checkDigits : function() {
        let correctCount = 0;
        let feedback = "";
        for (let i = 0; i < game.currentGuess.length; i++) {
            if (game.currentGuess[i] === game.correctCode[i]) {
                feedback += `<span class="correct">Digit ${i + 1}: ${game.currentGuess[i]} is correct!</span><br>`;
                correctCount++;
            } else if (game.correctCode.includes(game.currentGuess[i])) {
                feedback += `<span class="partial">Digit ${i + 1}: ${game.currentGuess[i]} is in the code but in the wrong position.</span><br>`;
            } else {
                feedback += `<span class="incorrect">Digit ${i + 1}: ${game.currentGuess[i]} is incorrect!</span><br>`;
            }
        }
        return {  correctCount, feedback};
    },
    updateUIResults: function( feedBack, correctCount ) {
        if (correctCount === 3) {
            game.gameState.isBombDefused = true;
            game.gameOver = true;
            document.getElementById('message').textContent = "Bomb diffused! You win!";
            document.getElementById('attempts-left').textContent = "";
            document.getElementById('feedback').innerHTML = "";
            document.getElementById("submit-guess").style.display = "none";
            document.getElementById("reset").style.display = "block";



        } else {
            game.gameState.attemptsLeft--;
            game.updateAttemptsLeft();
            document.getElementById('feedback').innerHTML = feedBack;

            // Disable correct digits
            game.disableCorrectDigits();

            if (game.gameState.attemptsLeft === 0) {
                game.gameOver = true;
                document.getElementById("submit-guess").style.display = "none";
                document.getElementById("reset").style.display = "block";
                document.getElementById('message').innerHTML = "Game Over! You've run out of attempts! <i style='color:red' class=\"fa-solid fa-circle-radiation\"></i>";
            }
        }
    },
    setGameDigits() {
        let digit1 = parseInt(document.getElementById('digit1').value);
        let digit2 = parseInt(document.getElementById('digit2').value);
        let digit3 = parseInt(document.getElementById('digit3').value);
        this.currentGuess = [digit1, digit2, digit3];
    }
};

document.addEventListener('DOMContentLoaded', function() {
    game.init();
    document.getElementById('submit-guess').addEventListener('click', () => {
        if (game.gameOver) {
            document.getElementById('message').innerHTML = "Game Over! Cannot keep playing.  You've run out of attempts.";
            return;
        }
        game.setGameDigits();
        let { feedback, correctCount} = game.checkDigits();
        game.updateUIResults( feedback, correctCount );
    });
    document.getElementById("reset").addEventListener("click", () =>{
        game.init();
        document.getElementById("digit1").value = 0;
        document.getElementById("digit2").value = 0;
        document.getElementById("digit3").value = 0;
        document.getElementById("submit-guess").style.display = "block";
        document.getElementById("reset").style.display = "none";

    })
});
