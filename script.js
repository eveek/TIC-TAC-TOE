
const initializaSection = document.querySelector(".start_game");
const gamePlaySection = document.querySelector(".play_game");
const cells = Array.from(document.querySelectorAll(".cells"));


class Player {
    constructor (mark){
        this.mark = mark;
        this.score = 0;
    }
}
let spaces = Array(9).fill(null);
let currentPlayer; 

const startGame = () => {
    initializaSection.style.display = "none";
    gamePlaySection.style.display = "block";
    currentPlayer = playerSelect.playerChoice();
    gameDisplay().hoverPic(currentPlayer);
    gameDisplay().setPlayerTurn(currentPlayer);

    const player1 = new Player(currentPlayer);
    const player2 = new Player(currentPlayer == "x"?"o":"x");

    return {player1, player2};
}


const playerSelect = (() => {
    const _pickX = document.getElementById("pick_x");
    const _pickO = document.getElementById("pick_o");
    const _playerCT = document.getElementById("pick_toggle");
    const _xCkd = document.getElementById("x_ckd");
    const _xUnckd = document.getElementById("x_unckd");
    const _oCkd = document.getElementById("o_ckd");
    const _oUnckd = document.getElementById("o_unckd");
    let playerPick = "x"

    _pickO.onclick = () => {
        _playerCT.style.left = "225px";
        _oCkd.style.display = "block";
        _oUnckd.style.display = "none";
        _xCkd.style.display = "none";
        _xUnckd.style.display = "block";
        playerPick = "o";
    }

    _pickX.onclick = () => {
        _playerCT.style.left = "10px";
        _xCkd.style.display = "block";
        _xUnckd.style.display = "none";
        _oCkd.style.display = "none";
        _oUnckd.style.display = "block";
        playerPick = "x";
    }

    const playerChoice = () => playerPick;
    return {playerChoice}

})();


const initialiseGame = (() => {
    const _playCpu = document.getElementById("cpu");
    const _playHuman = document.getElementById("player");

    _playHuman.onclick = () => {
        startGame();
    }

    _playCpu.onclick = () => {
        // setGame(startGame.playerChoice(), "computer")
    }

})();

const gameDisplay = () => {
    const _playerTurn = document.querySelector("[player_turn]");

    const setPlayerTurn = ((currentPlayer) => {
    _playerTurn.setAttribute("player_turn", currentPlayer);
    });

    const hoverPic = (currentPlayer) => {
        for (const cell of cells){
            const cellState = cell.getAttribute("field-state");

        if (cellState == ""){
            cell.setAttribute("set-hover", currentPlayer);
        } else {
            cell.setAttribute("set-hover", "");
        }
        }
    }

    const showWinner = (winningBlocks) => {
        const winningMark = spaces[winningBlocks[1]];

        // cells.forEach(cell => cell.removeEventListener("click", ))
        winningBlocks.map( block => {
            if (spaces[block] == "x"){
                cells[block].classList.add("win_x");
                console.log(cells[block])
            } else {
                cells[block].classList.add("win_o");
                console.log(cells[block])
            }
        });

        setTimeout(() => {
            congratulateWinner(winningMark);
        }, 500);
    }

    return {setPlayerTurn, hoverPic, showWinner}
}

    const congratulateWinner = (winningMark) => {
        const congrats = document.getElementById("congrats");
        const winner = document.getElementById("winner");
        const endGameBox = document.querySelector(".end_game");
        const overlay = document.querySelector(".overlay_bg");

        congrats.textContent = "CONGRATULATIONS!";
        winner.setAttribute("scr", `./assets/icon-${winningMark}.svg`);
        endGameBox.style.display = "grid";
        overlay.style.display = "block";
    }

const checkWinner = () => {
    const _winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], 
        [2, 4, 6]
    ]

    const playerHasWon = () => {
        for (const conmbination of _winningCombinations){
            let [a, b, c] = conmbination;

            if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]){
                return [a, b, c]
            }
        }
        return false;
    }

return {playerHasWon}
}

const cellClick = (() => {
    cells.forEach(cell => {
        cell.addEventListener("click", e => {
            const id = e.target.id;
            const target = e.target;
            // console.log(id)
            if (!spaces[id]) {
                spaces[id] = currentPlayer;
                target.setAttribute("field-state", currentPlayer);

                currentPlayer = currentPlayer == startGame().player1.mark?startGame().player2.mark:startGame().player1.mark;
                gameDisplay().hoverPic(currentPlayer);
                gameDisplay().setPlayerTurn(currentPlayer);
            }
            if (checkWinner().playerHasWon() !== false){
                let winningBlocks = checkWinner().playerHasWon();
                gameDisplay().showWinner(winningBlocks);
            }
        })
    })
})();
