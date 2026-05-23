function GameBoard() {
    const rows = 3;
    const columns = 3;
    const gameBoard = [];

    for (let i=0; i<rows; i++) {
        gameBoard[i] = [];
        for (let j=0; j<columns; j++) {
            gameBoard[i].push(Cell());
        }
    }

    const getGameBoard = () => gameBoard;

    const markSpace = (row, column, player) => {
        const availableCell = gameBoard[row][column];

        if (availableCell.getValue() === 0) return;  
        gameBoard[row][column].addMark(player);
    };

    const printBoard = () => {
        const gameBoardWithValues = gameBoard.map((row) => row.map((cell) => cell.getValue()));
        console.log(gameBoardWithValues);
    }

    return { getGameBoard, markSpace, printBoard};
}

function Cell() {
    let value = 0;

    const addMark = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {addMark, getValue};
}

