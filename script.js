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