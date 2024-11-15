const gameBoard = {
    size: 8, // Update to 8x8 grid
    board: [],
    playerPosition: { row: 0, col: 0 },
    obstacles: [],
    collectibles: [], // Store all collectibles (stars and bombs)
    bombs: [], // Separate bomb tracker
    gameState: {
        score: 0,
        lives: 3, // Player has 3 lives
        moves: 0, // Track number of moves
    },

    icons: {
        player: '<i class="fas fa-user player-icon"></i>',
        obstacle: '<i class="fas fa-times obstacle-icon"></i>',
        collectible: '<i class="fas fa-star collectible-icon"></i>',
        bomb: '<i class="fas fa-bomb bomb-icon"></i>',
    },

    // Initialize the board
    init() {
        this.createEmptyBoard();
        this.setupBoard();
        this.render();
    },

    createEmptyBoard() {
        for (let i = 0; i < this.size; i++) {
            const row = Array(this.size).fill('');
            this.board.push(row);
        }
    },

    setupBoard() {
        // Place obstacles, collectibles, and bombs randomly
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (Math.random() < 0.2) { // 20% chance of being an obstacle
                    this.board[i][j] = 'O';
                    this.obstacles.push({ row: i, col: j });
                } else if (Math.random() < 0.3) { // 30% chance of being collectible or bomb
                    let isBomb = Math.random() < 0.2; // 20% chance that a collectible is a bomb
                    if (isBomb) {
                        this.board[i][j] = 'B'; // B for bomb
                        this.bombs.push({ row: i, col: j });
                    } else {
                        this.board[i][j] = 'C'; // C for collectible
                        this.collectibles.push({ row: i, col: j });
                    }
                }
            }
        }
        this.board[this.playerPosition.row][this.playerPosition.col] = 'P'; // Place player at starting position
    },

    move(direction) {
        let newRow = this.playerPosition.row;
        let newCol = this.playerPosition.col;

        switch (direction) {
            case 'up': newRow = Math.max(0, newRow - 1); break;
            case 'down': newRow = Math.min(this.size - 1, newRow + 1); break;
            case 'left': newCol = Math.max(0, newCol - 1); break;
            case 'right': newCol = Math.min(this.size - 1, newCol + 1); break;
        }

        // Check for obstacles
        if (this.board[newRow][newCol] !== 'O') {
            this.board[this.playerPosition.row][this.playerPosition.col] = ''; // Clear old position
            this.playerPosition = { row: newRow, col: newCol }; // Update to new position
            this.gameState.moves++; // Increment the move count

            // Check for collectibles or bombs
            if (this.board[newRow][newCol] === 'C') {
                this.gameState.score++;
                this.collectibles = this.collectibles.filter(c => !(c.row === newRow && c.col === newCol));
                this.board[newRow][newCol] = ''; // Clear collectible after collecting
                this.showNotification("Collected a star!");
            } else if (this.board[newRow][newCol] === 'B') {
                this.gameState.lives--; // Decrease life when bomb is collected
                this.bombs = this.bombs.filter(b => !(b.row === newRow && b.col === newCol));
                this.board[newRow][newCol] = ''; // Clear bomb after collecting
                this.showNotification("Boom! You hit a bomb!");
                if (this.gameState.lives === 0) {
                    this.gameOver("You ran out of lives!");
                    return; // Stop the game
                }
            }

            // Check for game over condition: reaching the last square (bottom-right)
            if (newRow === this.size - 1 && newCol === this.size - 1) {
                this.gameOver("You reached the last square! You win!");
                return; // Stop the game
            }

            this.board[this.playerPosition.row][this.playerPosition.col] = 'P'; // Update new position
            this.render();
        }
    },
    gameOver(message) {
        // Display Game Over message
        const gameBoardElement = document.getElementById('game-board');
        gameBoardElement.innerHTML = `<h2>${message}</h2>`; // Show the custom message

        // Disable movement after game over
        window.removeEventListener('keydown', this.move); // Prevent further movement

        document.getElementById('notification').textContent = message; // Display the message in notification
    },
        render() {
            const gameBoardElement = document.getElementById('game-board');
            gameBoardElement.innerHTML = ''; // Clear the board before rendering
            for (let row = 0; row < this.size; row++) {
                for (let col = 0; col < this.size; col++) {
                    const tile = document.createElement('div');
                    tile.className = 'tile';

                    // Use icons from the object
                    if (this.board[row][col] === 'P') {
                        tile.innerHTML = this.icons.player; // Player icon
                    } else if (this.board[row][col] === 'O') {
                        tile.innerHTML = this.icons.obstacle; // Obstacle icon
                    } else if (this.board[row][col] === 'C') {
                        tile.innerHTML = this.icons.collectible; // Collectible icon
                    } else if (this.board[row][col] === 'B') {
                        tile.innerHTML = this.icons.collectible; // Bomb (same icon as collectible)
                        tile.style.backgroundColor = 'red'; // Optional: Make bombs look different
                    }

                    // Add the tile to the board container
                    gameBoardElement.appendChild(tile);
                }
            }

            // Update the move count display
            document.getElementById('move-count').textContent = `Moves: ${this.gameState.moves}`;
            document.getElementById('score').textContent = `Score: ${this.gameState.score}`;
            document.getElementById('lives').textContent = `Lives: ${this.gameState.lives}`;
            console.log(`Score: ${this.gameState.score}, Lives: ${this.gameState.lives}, Moves: ${this.gameState.moves}`);

    },

    showNotification(message) {
        const notificationElement = document.getElementById('notification');
        notificationElement.textContent = message;

        // Clear notification after a short time
        setTimeout(() => {
            notificationElement.textContent = '';
        }, 2000);
    },

    gameOver() {
        // Display Game Over message
        const gameBoardElement = document.getElementById('game-board');
        gameBoardElement.innerHTML = '<h2>Game Over!</h2>';
        document.getElementById('notification').textContent = 'You ran out of lives!';
    }
};

// Wait for the DOM to fully load before initializing the game
document.addEventListener('DOMContentLoaded', () => {
    gameBoard.init(); // Initialize the game

    // Add event listener for player movement
    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp': gameBoard.move('up'); break;
            case 'ArrowDown': gameBoard.move('down'); break;
            case 'ArrowLeft': gameBoard.move('left'); break;
            case 'ArrowRight': gameBoard.move('right'); break;
        }
    });
});
