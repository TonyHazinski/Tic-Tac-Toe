const cells = document.querySelectorAll(".cell");
let statusDisplay = document.getElementById("status");
let currentPlayer = "X";
let options = ["", "", "", "", "", "", "", "", ""];
let turns = 0;
let gameRunning = false;
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

function intitialzeGame() {
    console.log("Initializing...")
    cells.forEach(cell => {
        cell.onclick = cellClicked;
        cell.onmouseover = cellMouseOver;
        cell.onmouseleave = cellMouseLeave;
    });
    gameRunning = true;
    statusDisplay.innerText = `${currentPlayer}'s turn`

}

function cellClicked() {
    if (!gameRunning || options[this.attributes.cellindex.value] != "") {
        return;
    }
    turns += 1;
    this.style.color = 'black';
    this.innerText = currentPlayer;
    options[this.attributes.cellindex.value] = currentPlayer;
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusDisplay.innerText = `${currentPlayer}'s turn`
    checkGameStatus()
}

function cellMouseOver() {
    if (!gameRunning) {
        return;
    }
    if (options[this.attributes.cellindex.value] == "") {
        this.innerText = currentPlayer;
    }
}

function cellMouseLeave() {
    if (!gameRunning) {
        return;
    }
    if (options[this.attributes.cellindex.value] == "") {
        this.innerText = "";
    }
}

function checkGameStatus() {
    winConditions.forEach(condition => {
        if (options[condition[0]] == "") { //Make sure it's not an empty set
            return;
        }
        if (options[condition[0]] == options[condition[1]] && options[condition[1]] == options[condition[2]]) {
            statusDisplay.innerText = currentPlayer + " wins!"
            gameRunning = false;
        }
    })
    if (turns == 9 && gameRunning) {
        statusDisplay.innerText = "Draw!"
        gameRunning = false;
    }
}

function restart() {
    cells.forEach(cell => {
        cell.innerText = "";
        cell.style.color = "lightgray";
    })
    for (let i = 0; i < 9; i++) {
        options[i] = "";
    }
    gameRunning = true;
    statusDisplay.innerText = ""
    currentPlayer = "X"
    turns = 0;
}

intitialzeGame();
