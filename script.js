
const initializaSection = document.querySelector(".start_game");
const gamePlaySection = document.querySelector(".play_game");
const cells = Array.from(document.querySelectorAll(".cells"));
const overlay = document.querySelector(".overlay_bg");
const endGameBox = document.querySelector(".end_game");
const xScoreBox = document.getElementById("x_score");
const oScoreBox = document.getElementById("o_score");
const tieScoreBox = document.getElementById("tie_score");






class Player {
    constructor (mark){
        this.mark = mark;
        this.score = 0;
    }
}
let spaces = Array(9).fill(null);
let currentPlayer; 
let xScore = 0;
let oScore = 0;
let tieScore = 0;


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

    _playHuman.onclick = e => {
        buttonTransition(e.target);
        setTimeout(() => {
            startGame();
            
        }, 350);
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
        if (typeof winningBlocks == "object"){
            winningBlocks.map( block => {
                if (spaces[block] == "x"){
                    cells[block].classList.add("win_x");
                } else {
                    cells[block].classList.add("win_o");
                }
            });
            setTimeout(() => {
                congratulateWinner(winningMark);
            }, 200);
        } else {
            setTimeout(() => {
                congratulateWinner(winningMark);
            }, 200);
        }

    }

return {setPlayerTurn, hoverPic, showWinner}
}

const congratulateWinner = (winningMark) => {
    const _congrats = document.getElementById("congrats");
    const _winner = document.getElementById("winner");
    const _winnerStatus = document.getElementById("winner_status");

    if (winningMark == "x" || winningMark == "o"){
        _congrats.textContent = "CONGRATULATIONS!";
        _winner.src = `./assets/icon-${winningMark}.svg`;
        _winnerStatus.textContent = "TAKES THE ROUND";
        winningMark == "x" ? xScore++ : oScore++;
    } else {
        _congrats.textContent = "";
        _winner.src = "";
        _winnerStatus.textContent = "IT'S A TIE";
        tieScore++;
    }
    xScoreBox.textContent = xScore;
    oScoreBox.textContent = oScore;
    tieScoreBox.textContent = tieScore;
    endGameBox.style.display = "grid";
    overlay.style.display = "block";
    // updateScores();
}

const updateScores = () => {

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

const playBtnClick = (e) => {
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
    if (spaces.every(box => box != null) && checkWinner().playerHasWon() == false) {
        gameDisplay().showWinner("tie");
    }
        
}

const buttonFunc = () => {
    const _reloadGameBox = document.querySelector(".reload_game");

    const refreshGame = e => {
        buttonTransition(e.target);
        setTimeout(() => {
            overlay.style.display = "block";
            _reloadGameBox.style.display = "block";
        }, 350);
    }

    const continueGame = e => {
        buttonTransition(e.target);
        setTimeout(() => {
            overlay.style.display = "none";
            _reloadGameBox.style.display = "none";
        }, 350);
    }

    const restartGame = e => {
        buttonTransition(e.target);
        setTimeout(() => {
            overlay.style.display = "none";
            _reloadGameBox.style.display = "none";
            rebootGame();
            startGame();
        }, 350);
    }

    const nextRound = e => {
        buttonTransition(e.target);
        setTimeout(() => {
            overlay.style.display = "none";
            endGameBox.style.display = "none";
            spaces = Array(9).fill(null);
            for (const cell of cells){
                cell.setAttribute("field-state", "");
            }
            startGame();
            for (const cell of cells){
                cell.className = "cells";
            }
        }, 350);
    }

    const quitGame = e => {
        buttonTransition(e.target);
        setTimeout(() => {
            gamePlaySection.style.display = "none";
            endGameBox.style.display = "none";
            overlay.style.display = "none";
            initializaSection.style.display = "block";
            rebootGame()
        }, 350);
    }

    return {refreshGame, continueGame, restartGame, nextRound, quitGame}
}

const rebootGame = () => {
    spaces = Array(9).fill(null);
    for (const cell of cells){
        cell.setAttribute("field-state", "");
    }
    xScore = 0;
    oScore = 0;
    tieScore = 0;
    xScoreBox.textContent = xScore;
    oScoreBox.textContent = oScore;
    tieScoreBox.textContent = tieScore;
    for (const cell of cells){
        cell.className = "cells";
    }
}


const actionClicks = (() => {
    const _quitBtn = document.getElementById("quit");
    const _nextRoundBtn = document.getElementById("next_round");
    const _cancelBtn = document.getElementById("cancel");
    const _restartBtn = document.getElementById("restart");
    const _refreshBtn = document.getElementById("refresh");

    cells.forEach(cell => {
        cell.addEventListener("click", e => playBtnClick(e))
    })

    _quitBtn.onclick = e => buttonFunc().quitGame(e);
    _nextRoundBtn.onclick = e => buttonFunc().nextRound(e);
    _cancelBtn.onclick = e => buttonFunc().continueGame(e);
    _restartBtn.onclick = e => buttonFunc().restartGame(e);
    _refreshBtn.onclick = e => buttonFunc().refreshGame(e);

})();


// BUTTONS CLICK TRANSITION
const buttonTransition = (button) => {
    button.classList.add("click");
    setTimeout(() => {
        button.classList.remove("click");
        
    }, 300);
}
