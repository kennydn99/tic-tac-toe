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

    board[1][1] = 0;

    //method to get board for UI
    const getBoard = () => board;

    const placeLetter = (row, col, letter) => {

        //create new array containing only the rows that are equal to 0. Add to new array if it is, else filter out
        //need to make getValue method for Cell object
        const availableCells = board.filter((row) => row[col] === 0);
        console.log(availableCells);

        //transform each remaining row. Extract and includes only the element at specified col from each row, making a new array of these values
        const availableCellsMap = availableCells.map(row => row[col]);
        console.log(availableCellsMap);

        return {
            availableCells,
            availableCellsMap
        }
    };

    return {
        board,
        getBoard,
        placeLetter
    }
})();