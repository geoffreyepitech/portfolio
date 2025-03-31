// puissance4.js
class Puissance4 {
    constructor(options) {
        this.width = options.width || 7;
        this.height = options.height || 6;
        this.players = [
            { id: 1, color: options.player1Color || '#ff0000' },
            { id: 2, color: options.player2Color || '#ffff00' }
        ];
        this.currentPlayer = 1;
        this.board = [];
        this.gameOver = false;
        this.moveHistory = [];
    }

    init() {
        console.log("Puissance4.init called");
        this.initializeBoard();
        this.renderBoard();
        this.setupEventListeners();
    }

    initializeBoard() {
        this.board = Array(this.height).fill().map(() =>
            Array(this.width).fill(0)
        );
    }

    renderBoard() {
        const boardElement = document.getElementById('board');
        if (!boardElement) {
            console.error("Element #board not found in the DOM.");
            return;
        }
        boardElement.innerHTML = '';

        for (let x = 0; x < this.width; x++) {
            const column = document.createElement('div');
            column.className = 'column';
            column.dataset.x = x;

            for (let y = this.height - 1; y >= 0; y--) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                
                const playerId = this.board[y][x];
                if (playerId) {
                    cell.style.backgroundColor = this.players[playerId - 1].color;
                }
                
                column.appendChild(cell);
            }
            boardElement.appendChild(column);
        }

        this.updatePlayerTurnDisplay();
    }

    updatePlayerTurnDisplay() {
        const playerTurnElement = document.getElementById('player-turn');
        if (playerTurnElement) {
            playerTurnElement.textContent = 
                `Joueur ${this.currentPlayer} (${this.players[this.currentPlayer - 1].color})`;
        } else {
            console.error("Element #player-turn not found in the DOM.");
        }
    }

    setupEventListeners() {
        const boardElement = document.getElementById('board');
        if (!boardElement) {
            console.error("Element #board not found for event listeners.");
            return;
        }
        boardElement.addEventListener('click', (e) => {
            console.log("Board clicked");
            if (this.gameOver) return;
            const column = e.target.closest('.column');
            if (column) {
                console.log("Column clicked:", column.dataset.x);
                this.playMove(parseInt(column.dataset.x));
            }
        });

        const restartButton = document.getElementById('restart');
        if (restartButton) {
            restartButton.addEventListener('click', () => {
                console.log("Restart button clicked");
                this.resetGame();
            });
        } else {
            console.error("Element #restart not found.");
        }

        const undoButton = document.getElementById('undo');
        if (undoButton) {
            undoButton.addEventListener('click', () => {
                console.log("Undo button clicked");
                this.undoLastMove();
            });
        } else {
            console.error("Element #undo not found.");
        }
    }

    playMove(column) {
        for (let y = 0; y < this.height; y++) {
            if (this.board[y][column] === 0) {
                this.board[y][column] = this.currentPlayer;
                this.moveHistory.push({ column, row: y, player: this.currentPlayer });
                this.renderBoard();
                
                if (this.checkWin(column, y)) {
                    this.showVictory();
                    return;
                }
                
                if (this.checkDraw()) {
                    this.showDraw();
                    return;
                }
                
                this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                return;
            }
        }
    }

    checkWin(x, y) {
        const player = this.currentPlayer;
        const directions = [
            [0, 1],  // vertical
            [1, 0],  // horizontal
            [1, 1],  // diagonal droite
            [-1, 1]  // diagonal gauche
        ];

        for (let [dx, dy] of directions) {
            let count = 1;
            for (let i = 1; i < 4; i++) {
                const newX = x + (dx * i);
                const newY = y + (dy * i);
                if (this.isValidCell(newX, newY) && this.board[newY][newX] === player) {
                    count++;
                } else {
                    break;
                }
            }
            for (let i = 1; i < 4; i++) {
                const newX = x - (dx * i);
                const newY = y - (dy * i);
                if (this.isValidCell(newX, newY) && this.board[newY][newX] === player) {
                    count++;
                } else {
                    break;
                }
            }
            if (count >= 4) return true;
        }
        return false;
    }

    isValidCell(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    checkDraw() {
        return this.board.every(row => row.every(cell => cell !== 0));
    }

    showVictory() {
        this.gameOver = true;
        const victoryScreen = document.getElementById('victory-screen');
        if (victoryScreen) {
            document.getElementById('winner-text').textContent = 
                `Victoire du Joueur ${this.currentPlayer} !`;
            victoryScreen.style.display = 'block';
        } else {
            console.error("Element #victory-screen not found.");
        }
    }

    showDraw() {
        this.gameOver = true;
        const victoryScreen = document.getElementById('victory-screen');
        if (victoryScreen) {
            document.getElementById('winner-text').textContent = 'Match nul !';
            victoryScreen.style.display = 'block';
        } else {
            console.error("Element #victory-screen not found.");
        }
    }

    undoLastMove() {
        if (this.gameOver || this.moveHistory.length === 0) return;

        const lastMove = this.moveHistory.pop();
        this.board[lastMove.row][lastMove.column] = 0;
        this.currentPlayer = lastMove.player;
        this.renderBoard();
    }

    resetGame() {
        this.gameOver = false;
        this.currentPlayer = 1;
        this.moveHistory = [];
        this.initializeBoard();
        this.renderBoard();
        const victoryScreen = document.getElementById('victory-screen');
        if (victoryScreen) {
            victoryScreen.style.display = 'none';
        }
    }
}