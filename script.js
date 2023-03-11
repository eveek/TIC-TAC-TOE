

function startGame(){
const pickX = document.getElementById("pick_x");
const pickO = document.getElementById("pick_o");
const playerCT = document.getElementById("pick_toggle");
const xCkd = document.getElementById("x_ckd");
const xUnckd = document.getElementById("x_unckd");
const oCkd = document.getElementById("o_ckd");
const oUnckd = document.getElementById("o_unckd");

const playerPick = (choice) => {
    let playerChoice = choice;
    return playerChoice;
}

pickO.onclick = () => {
    playerCT.style.left = "225px";
    oCkd.style.display = "block";
    oUnckd.style.display = "none";
    xCkd.style.display = "none";
    xUnckd.style.display = "block";
    playerPick("o");
}

pickX.onclick = () => {
    playerCT.style.left = "10px";
    xCkd.style.display = "block";
    xUnckd.style.display = "none";
    oCkd.style.display = "none";
    oUnckd.style.display = "block";
    playerPick("x");
}

return playerPick("j");
}

function chk (){
    document.addEventListener("keypress", e => {
        if (e.key == "t"){
            console.log(startGame())
        }
    })
}
chk()
startGame()
