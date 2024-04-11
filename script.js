// Gameboard object that stoes gameboard as an array
const Gameboard = (function () {
    let board = [];
    const rows = cols = 3;

    //fill board with cells
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            //Cell object
            board[i].push(Cell());
        }
    }

    const resetBoard = () => {
        board = [];
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < cols; j++) {
                //Cell object
                board[i].push(Cell());
            }
        }
    };


    //method to get board for UI
    const getBoard = () => board;

    const placeLetter = (x, y, player, callback) => {

        if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) {
            console.log("Invalid move! Coordinates out of bounds.");
            return;
        }

        if(board[x][y].getValue() !== '') {
            console.log("Invalid move! Cell already occupied.");
            return;
        }
        
        board[x][y].addLetter(player);
        callback();
    };

    //method to print board
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }

    return {
        board,
        getBoard,
        placeLetter,
        printBoard,
        resetBoard
    }
})();

function Cell() {
    let value = '';

    const addLetter = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addLetter,
        getValue
    }
}

const GameController = (function (){
    const playerX = "Player X";
    const playerO = "Player O";
    
    let gameOver = false;

    const isGameOver = () => gameOver;

    const resetGameOver = () => gameOver = false;

    const players = [
        {
            name: playerX,
            letter: 'X'
        },
        {
            name: playerO,
            letter: 'O'
        }
    ];

    let activePlayer = players[0];
    
    const switchPlayerTurn = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        Gameboard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const checkWin = (player) => {
        const board = Gameboard.getBoard();

        //Horizontal win condition
        for (let i = 0; i < board.length; i++) {
            if (board[i][0].getValue() === player.letter &&
                board[i][1].getValue() === player.letter &&
                board[i][2].getValue() === player.letter) {
                    return true;
                }
        }

        //Vertical win condition
        for (let i = 0; i < board.length; i++) {
            if (board[0][i].getValue() === player.letter &&
                board[1][i].getValue() === player.letter &&
                board[2][i].getValue() === player.letter) {
                    return true;
                }
        }

        //Diagonal Win
        if ((board[0][0].getValue() === player.letter &&
            board[1][1].getValue() === player.letter &&
            board[2][2].getValue() === player.letter) ||
            (board[0][2].getValue() === player.letter &&
                board[1][1].getValue() === player.letter &&
                board[2][0].getValue() === player.letter)) {
            return true;
        }

        return false;
    }

    const playRound = (r, c) => {
        console.log(`${getActivePlayer().name} is placing ${getActivePlayer().letter} into row: ${r}, col: ${c}.`);
        Gameboard.placeLetter(r, c, getActivePlayer().letter, () => {
            
            //need to check win condition & handle logic
            if (checkWin(getActivePlayer())) {
                console.log(`${getActivePlayer().name} wins!`);
                gameOver = true;
                return;
            }

            //check for draw
            const board = Gameboard.getBoard();
            let isDraw = true;
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j].getValue() === '') {
                        isDraw = false;
                        break;
                    }
                }
                if(!isDraw) {
                    break;
                }
            }
            if (isDraw) {
                console.log("It's a draw!");
                gameOver = true;
                return;
            }

            switchPlayerTurn();
            printNewRound();
        });
    };

    //start game
    printNewRound();

    return {
        playRound,
        getActivePlayer,
        isGameOver,
        resetGameOver
    };
})();

const DisplayController = (function() {
    const turnDisplay = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const container = document.querySelector('.container');

    const updateScreen = () => {
        //clear board?
        boardDiv.textContent = '';

        //get updated board and active player
        const board = Gameboard.getBoard();
        const activePlayer = GameController.getActivePlayer();

        turnDisplay.textContent = `${activePlayer.name}'s turn`;

        //render board
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                cellButton.dataset.row = i;
                cellButton.dataset.col = j;
                cellButton.textContent = board[i][j].getValue();
                boardDiv.appendChild(cellButton);
                console.log('Game is over? ', GameController.isGameOver());
            }
        }

        if (GameController.isGameOver()) {
            boardDiv.removeEventListener("click", cellClickListener);
            turnDisplay.textContent = `${activePlayer.name} takes the W!`;

            const restartButton = document.createElement('button');
            restartButton.textContent = 'Restart';
            restartButton.classList.add('restart-btn')
            container.appendChild(restartButton);
            restartButton.addEventListener('click', restartGame);
            console.log("GAME OVER!")
        } else {
            const existingRestartButton = document.querySelector('.restart-btn');
            if (existingRestartButton) {
                existingRestartButton.remove();
            }
        }

    }

    const restartGame = () => {
        GameController.resetGameOver();
        console.log(`restart game, gameover is`, GameController.isGameOver());
        //reinitialize game board
        Gameboard.resetBoard();
        Gameboard.printBoard();
        boardDiv.addEventListener('click', cellClickListener);

        updateScreen();
    }


    const cellClickListener = (e) => {
        const selectedCellRow = e.target.dataset.row;
        const selectedCellCol = e.target.dataset.col;
        if (!selectedCellCol && !selectedCellRow) return;

        GameController.playRound(selectedCellRow, selectedCellCol);
        updateScreen();
    }
    
    boardDiv.addEventListener('click', cellClickListener);

    updateScreen();
})();