let state = {}


function resetState() {
    state.board = [
        {
            isUp: false
        },
        {
            isUp: false
        },
        {
            isUp: false
        },
        {
            isUp: false
        },
        {
            isUp: false
        },
        {
            isUp: false
        },
        {
            isUp: false
        },
        {
            isUp: false
        },
        {
            isUp: false
        },
    ];
    state.lastHoleIdx = -1;
    state.players = ['', '']
    state.points = [0, 0];
    state.currentPlayerIdx = 0;
    state.gameTime = 30;
    state.score = 0;
    state.timeUp = 1000;
    state.isRunning = false;
}
// ***************** DOM SELECTORS *****************
const boardElem = document.getElementById('game');
const start = document.getElementById('StartGame');
const Countdown = document.getElementById('Countdown');
const Restart = document.getElementById('Restart');
const Score = document.getElementById('score');

// ***************** GAME LOGIC HELPER FUNCTIONS *****************

function randomHole() {
    const idx = Math.floor(Math.random() * state.board.length);
    //console.log(idx)
    if (idx === state.lastHoleIdx) {
        return randomHole();
    }
    const randomHoleIdx = Math.floor(Math.random() * state.board.length);
    return state.board[randomHoleIdx]
}

function showRandomHole() {
    let hole = randomHole()
    hole.isUp = true
    render()
    setTimeout(function down() {
            hole.isUp = false
            render()
    }, state.timeUp) 
}

function startGame(event){
    //every x number of seconds, get a random hole on screen to show a mole
    //make sure that after x seconds that mole disappears
    
    if (state.gameTime === 0) return;
    if (state.gameTime === 10){
        state.timeUp = 500;
    }
    state.gameTime --
    showRandomHole();
    setTimeout(startGame, 1000);

}

// ***************** DOM MANIPULATION FUNCTIONS ***************** 

function renderBoard() {
    boardElem.innerText = '';
    for(let i=0; i<state.board.length; i++){
        let card = state.board[i]
        // create an HTML element 
        let cellElem = document.createElement('div')
        // store the index of the card in the board as part of the HTML element attribute dataset
        cellElem.dataset.index = [i]
        // add the value of the card to the div
        if (card.isUp){
            cellElem.classList.add('mole')
        }else {
            // add a class, hole, to the div
            cellElem.classList.add('hole')
        }  


        boardElem.appendChild(cellElem)
    }
}

function renderCountdown() {
    Countdown.innerText = state.gameTime;
}

function renderResetButton() {
    if(state.gameTime === 0){
        Restart.innerHTML = `<button class="restart">Play Again!</button>`;
    }
}

function renderScore() {
    score.innerText = state.score
}

function renderStart() {
    if(!state.isRunning){
        start.innerHTML = `<button>Start!</button>`;
    }else {
        start.innerHTML = '';
    }
}

function render() {
    renderBoard();
    renderCountdown();
    renderResetButton();
    renderScore();
    renderStart();
}

// ***************** EVENT LISTENERS *****************

start.addEventListener('click', function(event){
    state.isRunning = true;
    startGame();
})

boardElem.addEventListener('click', function(event){
    if(!['hole','mole'].includes(event.target.className)) return;
    let idx = event.target.dataset.index
    let hole = state.board[idx]
    if (hole.isUp === true) {
        state.score++
        console.log(state.score)
    } 
    render()
})

Restart.addEventListener('click', function(event){
    resetState()
    render()
})

// ***************** BOOTSTRAPPING *****************

 resetState()
 render()



