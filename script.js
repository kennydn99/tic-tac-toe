// Gameboard object that stoes gameboard as an array
const Gameboard = (function () {
    const board = [];
    const rows = cols = 3;

    //fill board with cells
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            //Cell object
            board[i].push('cell');
        }
    }
    board[1][1] = board[0][0] = '';

    //method to get board for UI
    const getBoard = () => board;

    const placeLetter = (x, y, letter) => {

        board.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if(col === '') {
                    if(rowIndex === x && colIndex === y) {
                        board[x][y] = letter;
                    }
                }
            });
        });
    };

    //method to print board
    const printBoard = () => {
        console.log(board);
    }

    return {
        board,
        getBoard,
        placeLetter,
        printBoard
    }
})();