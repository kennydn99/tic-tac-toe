// Gameboard object that stoes gameboard as an array
const Gameboard = (function () {
    const board = [];
    const rows = cols = 3;

    //fill board with cells
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            //Cell object
            board[i].push(Cell());
        }
    }

    //method to get board for UI
    const getBoard = () => board;

    const placeLetter = (x, y, player) => {

        if(board[x][y].getValue() === '') {
            board[x][y].addLetter(player);
        }
        
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
        printBoard
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

    const playRound = (r, c) => {
        console.log(`${getActivePlayer().name} is placing ${getActivePlayer().letter} into row:${r}, col${c}.`);
        Gameboard.placeLetter(r, c, getActivePlayer().letter);
        
        //need to check win condition & handle logic
        
        switchPlayerTurn();
        printNewRound();
    };

    //start game
    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
})();