const gameBoard = {
    size: 4,
    board: [],
    icons: {
        player: "<i class=\"fa-solid fa-chess-king\"></i>",
        obstacle: "<i class=\"fa-solid fa-dungeon\"></i>",
        collectible: "<i class=\"fa-solid fa-scroll\"></i>"
    },
    odds: {
        chanceOfObstacle: .2,
        chanceOfCollectible: .3,
    },
    obstacles: [],
    collectibles: [],

    init(){
        alert("Game is a foot")
        this.createEmptyBoard();
        this.setUpBoard();
    },
    createEmptyBoard() {
        for(let i = 0; i < this.size; i++) {
            let row = Array(this.size).fill('');
            this.board.push(row);
        }
    },
    setUpBoard() {
        for(let row = 0; row < this.size; row++) {
            for(let col = 0; col < this.size; col++) {
                if(Math.random() < this.odds.chanceOfObstacle){
                    this.board[row][col] = 'O';
                    this.obstacles.push({row: row, col: col})
                }
                else if(Math.random() > this.odds.chanceOfCollectible){
                    this.board[row][col] = 'C';
                    this.collectibles.push({row: row, col: col})
                }
            }
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    gameBoard.init();
    alert(`Board: ${gameBoard.board.length}`);
})