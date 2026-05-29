function GameBoard() {
    const rows = 3;
    const columns = 3;
    const gameBoard = [];
    const main = document.querySelector('.main');

    for (let i=0; i<rows; i++) {
        gameBoard[i] = [];
        for (let j=0; j<columns; j++) {
            gameBoard[i].push(Cell());
        }
    }

    const getGameBoard = () => gameBoard;

    const markSpace = (row, column, player) => {
        const availableCell = gameBoard[row][column];

        if (availableCell.getValue() !== 0) return;  
        gameBoard[row][column].addMark(player);
        const playerSquare = document.createElement('div');
        const playerSquareContent = document.createTextNode(player);
        playerSquare.appendChild(playerSquareContent);
        main.appendChild(playerSquare);
    };

    const printBoard = () => {
        const gameBoardWithValues = gameBoard.map((row) => row.map((cell) => cell.getValue()));
        console.log(gameBoardWithValues);
    };

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

function GameController(
    playersOneName = "Player One",
    playersTwoName = "Player Two"
) {
    const gameBoard = GameBoard();

    const players = [
        {
            name: playersOneName,
            mark: "X"
        },
        {
            name: playersTwoName,
            mark: "O"
        },
    ];

    let activePlayer = players[0];

    let winner = null;

    const setWinner = () => getActivePlayer();  

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`It's time for ${getActivePlayer().name} to make a move`);
    };

    const playRound = (row, column) => {
        console.log(`Adding a ${getActivePlayer().mark} at position: row ${row} and column: ${column}`);
        gameBoard.markSpace(row, column, getActivePlayer().mark);

        const checkWinner = (mark) => {
            let columnCheck = false;

            const checkColumn = () => {
                gameBoard.getGameBoard().forEach((row) => {
                    columnCheck = row[column].getValue() === mark ? true : false;
                });
            }

            checkColumn();
            
            if (
                gameBoard.getGameBoard()[row].filter((cell) => cell.getValue() === mark).length === 3 ||
                columnCheck ||
                gameBoard.getGameBoard()[0][0].getValue() === mark && gameBoard.getGameBoard()[1][1].getValue() === mark && gameBoard.getGameBoard()[2][2].getValue() === mark ||
                gameBoard.getGameBoard()[2][0].getValue() === mark && gameBoard.getGameBoard()[1][1].getValue() === mark && gameBoard.getGameBoard()[0][2].getValue() === mark
            ) {
                winner = setWinner();
            }
        }

        checkWinner(getActivePlayer().mark);

        if (winner) {
            gameBoard.printBoard();
            console.log(`The winner is ${getActivePlayer().name}`);
        } else {
            switchPlayer();
            printNewRound();
        }
    };

    printNewRound();

    return {getActivePlayer,  playRound};
}

const game = GameController();
