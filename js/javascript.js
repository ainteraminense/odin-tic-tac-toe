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
        const availableCell = gameBoard[row][column]
        .filter((cell) => cell === null);

        if (!availableCell) return;  
        gameBoard[row][column].addMark(player);
    };
}

