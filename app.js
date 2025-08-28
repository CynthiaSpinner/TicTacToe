const GameBoard = (() =>{
    let board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']; //test

    const render = () => {
        const gameboardDiv = document.getElementById('gameboard');
        gameboardDiv.innerHTML = '';

        board.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.textContent =cell;
            cellDiv.dataset.index = index;
            gameboardDiv.appendChild(cellDiv);
        });
    };

    return { render };
})();

//testing
GameBoard.render();


