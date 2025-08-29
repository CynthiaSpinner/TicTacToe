//game board
const GameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', '' ]; 

    const render = () => {
        const gameboardDiv = document.getElementById('gameboard');
        gameboardDiv.innerHTML = '';

        board.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.textContent =cell;
            cellDiv.dataset.index = index;

            //adding click listener to each cell as its created
            cellDiv.addEventListener('click', (e) => {
                const cellIndex = parseInt(e.target.dataset.index);
                GameController.playTurn(cellIndex);
            });

            gameboardDiv.appendChild(cellDiv);
        });
    };

    const setCell = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            render();
            return true;
        }
        return false;
    }

    const getCell = (index) => board[index];

    const reset = () => {
        board = ['', '', '', '', '', '', '', '', '' ];
        render();
    }

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
            [0, 4, 8], [2, 4, 6] //diagnal
        ];

        for(let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; //returns x or o
            }
        }

        //checking for tie
        if(board.every(cell => cell !== '')) {
            return 'tie';
        }

        //no winner yet
        return null 
    };

    const isFull = () => board.every(cll => cell !== '');

    return { render, setCell, getCell, reset, checkWinner, isFull };
})();

GameBoard.render();

const Player = (name, marker) => {
    return { name, marker};
};

//display controller
const DisplayController = (() => {
    const currentPlayerDiv = document.getElementById('current-player');
    const gameStatusDiv = document.getElementById('game-status');

    const updateCurrentPlayer = (playerName) => {
        currentPlayerDiv.textContent = `Current Player: ${playerName}`;
    };

    const updateGameStatus = (message) => {
        gameStatusDiv.textContent = message;
    };

    return { updateCurrentPlayer, updateGameStatus };
    
})();

//game controller
const GameController = (() => {
    let player1, player2, currentPlayer, gameActive = false;

    // starting game
    const startGame = () => {
        const p1Name = document.getElementById('player1-name').value || 'Player 1';
        const p2Name = document.getElementById('player2-name').value || 'Player 2';

        player1 = Player(p1Name, 'X');
        player2 = Player(p2Name, 'O');
        currentPlayer = player1;
        gameActive = true;

        DisplayController.updateCurrentPlayer(currentPlayer.name);
        DisplayController.updateGameStatus('Game in progress');

        GameBoard.reset();
        
    };

    const playTurn = (cellIndex) => {
        if(!gameActive) return;

        if (GameBoard.setCell(cellIndex, currentPlayer.marker)) {
           

            // checking for winners after each move
            const winner = GameBoard.checkWinner();

            if (winner) {
                gameActive = false;
                if(winner === 'tie') {
                    DisplayController.updateGameStatus("Its a tie!");
                } else {
                    const winnerName = winner === player1.marker ? player1.name : player2.name;
                    DisplayController.updateGameStatus(`${winnerName} wins!`);
                }

                //show restart button
                document.getElementById('restart-game').style.display = 'block';
            } else {
                //switching players
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                DisplayController.updateCurrentPlayer(currentPlayer.name);
            }
        }
    };

    //game restart
    const restartGame = () => {
        gameActive = false;
        DisplayController.updateCurrentPlayer('');
        DisplayController.updateGameStatus('Enter names and start game');
        document.getElementById('restart-game').style.display = 'none';
        GameBoard.reset();
    };

      

    return { startGame, playTurn, restartGame };
})();

document.getElementById('start-game').addEventListener('click', GameController.startGame);

document.getElementById('restart-game').addEventListener('click', GameController.restartGame);

