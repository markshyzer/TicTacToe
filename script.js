// Caching the DOM
let board = document.getElementById('board')
let player = document.getElementById('player')
let reset = document.getElementById('reset')


// variables
let gameState = [[0,0,0], [0,0,0],[0,0,0]]
let turn = 1
let checkSum = 0
let checkWinner = false
let win = 0

board.addEventListener("click", function(event) {
    if (event.target.classList.contains('space')) {
        let x = Math.floor(event.target.id/10)
        let y = event.target.id%10
        if (gameState[x][y] === 0) {
            gameState[x][y] = turn
            render()
            checkWinner = winner()
            if (checkWinner === true) {
                renderWinner(turn)
            }
            turn *= -1
        }
    }
})

reset.addEventListener("click", function() {
    init()
})



function render () {
    gameState.forEach(function (x, xi) {
        x.forEach(function (y, yi) {
            if (y === -1) {
                document.getElementById(xi.toString() + yi.toString()).innerHTML = 'O'
            } else if (y === 1) {
                document.getElementById(xi.toString() + yi.toString()).innerHTML = 'X'
            } else {
                document.getElementById(xi.toString() + yi.toString()).innerHTML = ''  
            }
        })
    })
    if (turn === - 1) {
        player.innerHTML = `X's turn`
    } else if (turn === 1) {
        player.innerHTML = `O's turn`
    }

}

function winner() {
    // Rows
    gameState.forEach(function (x) {
        if (Math.abs(x[0] + x[1] + x[2]) > 2) {
            win += 1
        }
    })
// Columns
for (i = 0; i < 3; i++) {
    if (Math.abs(gameState[0][i] + gameState[1][i] + gameState[2][i]) === 3) {
    win += 1
    }
} // Diagonals
if (gameState[1][1] != 0) {
    if ((gameState[1][1] === gameState[0][0]) && (gameState[1][1] === gameState[2][2])) {
        win +=1
    }
    if((gameState[1][1] === gameState[0][2]) && (gameState[1][1] === gameState[2][0])) {
        win +=1
    }
}
    return win > 0
}

function renderWinner(playerTurn) {
    if (turn === 1) {
        player.innerHTML = `X wins!`

    } else if (turn === -1) {
        player.innerHTML = `O wins!`
    }
    win = 0
}
function init() {
    gameState = [[0,0,0],[0,0,0],[0,0,0]]
    turn = 1
    checkSum = 0
    checkWinner = false
    win = 0
    render()
}