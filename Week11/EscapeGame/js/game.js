const gameBoard = {
    size: 4,
    board: [],
    moves: 0,
    score: 0,
    icons: {
        player: "<i class='fa-solid fa-chess-king player-icon'></i>",
        obstacle: "<i class='fa-solid fa-dungeon obstacle-icon'></i>",
        collectible: "<i class='fa-solid fa-scroll collectible-icon'></i>"
    },
    playerPosition: {row: 0, col: 0},

    odds: {
        chanceOfObstacle: .2,
        chanceOfCollectible: .3,
    },
    obstacles: [],
    collectibles: [],

    init(){
        this.createEmptyBoard();
        this.setUpBoard();
        this.render();
    },
    createEmptyBoard() {
        for(let i = 0; i < this.size; i++) {
            let row = Array(this.size).fill('');//Adds an array of 4 empty strings in order to create a 2D array
            this.board.push(row); // Push means it adds to the end of the array (appending)
        }
    },
    setUpBoard() {
        for(let row = 0; row < this.size; row++) {
            for(let col = 0; col < this.size; col++) {
                if(Math.random() < this.odds.chanceOfObstacle){ //Math.random() returns a random number between 0-1
                    this.board[row][col] = 'O';
                    this.obstacles.push({row: row, col: col})
                }
                else if(Math.random() > this.odds.chanceOfCollectible){
                    this.board[row][col] = 'C';
                    this.collectibles.push({row: row, col: col})
                }
            }
        }
        this.board[this.playerPosition.row][this.playerPosition.col] = 'P';
    },
    showNotification(message){
        const notification = document.getElementById("notification");
        notification.innerText = message;
        setTimeout(()=>{
            notification.innerText = '';
        }, 3000);
    },
    render(){
        const gameBoardDOM = document.getElementById("game-board");
        gameBoardDOM.innerHTML = ""; //Clear out everything
        for(let row = 0; row < this.size; row++) {
            for(let col = 0; col < this.size; col++) {
                const tile = document.createElement("div");
                tile.className = "tile"; //<div class="tile">
                if(this.board[row][col] ==='P'){
                    tile.innerHTML = this.icons.player;
                }
                else if(this.board[row][col] === 'O'){
                    tile.innerHTML = this.icons.obstacle; //if tile is o for obstacle, then put an obstacle icon in that space in the array
                }
                else if(this.board[row][col] === 'C'){
                    tile.innerHTML = this.icons.collectible;
                }
                gameBoardDOM.appendChild(tile)
            }
        }
        document.getElementById("move-count").textContent = `Moves: ${this.moves}`;
    },
    move(direction){
      //alert("Inside move direction: " + direction);
        let pRow = this.playerPosition.row; // Get player position of the row
        let pCol = this.playerPosition.col;// Get player position of the column
        switch(direction){
            case 'up':
                pRow = Math.max(0,pRow - 1);
                break;
            case 'down':
                pRow = Math.min(this.size - 1, pRow + 1);
                break;
            case 'left':
                pCol = Math.max(0, pCol - 1);
                break;
            case 'right':
                pCol = Math.min(this.size - 1,pCol + 1);
                break;
        }
        // alert(`Inside move direction: nRow: ${pRow} nCol: ${pCol}`)
        //Check for obstacles
        if(this.board[pRow][pCol] !== "O"){
            this.board[this.playerPosition.row][this.playerPosition.col] = '';
            this.playerPosition.row = pRow;
            this.playerPosition.col = pCol;
            this.moves++;
            if(this.board[pRow][pCol] === "C"){
                this.board[pRow][pCol] = '';
                this.score += 5;
                document.getElementById("score").innerText =`Score: ${this.score}`;
                //This is collectible this.collectibles.push({row: row, col: col})
                this.collectibles = this.collectibles.filter(collectible =>
                    !(collectible.row === pRow && collectible.col === pCol)
                )
                this.showNotification("Collected an item!")
            }
            this.board[this.playerPosition.row][this.playerPosition.col] = 'P';
            this.render();
        }//Else you cannot move onto an obstacle
    },
}
document.addEventListener('DOMContentLoaded', () => {
    gameBoard.init();
    window.addEventListener('keydown', (e) => {
        //alert( `Keyed down ${e.key} in game board ` );
        switch (e.key){
            case 'ArrowUp':
                gameBoard.move('up');
                break;
            case 'ArrowDown':
                gameBoard.move('down');
                break;
            case 'ArrowRight':
                gameBoard.move('right');
                break;
            case 'ArrowLeft':
                gameBoard.move('left');
                break;
        }
    })
})