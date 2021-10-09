let intialState;

let state = {}
let boardElem = document.getElementById('game');

function resetState() {
    state.board = [
        {
            isUp: true,
            isCivilian: false
        },
        {
            isUp: false,
            isCivilian: false
        },
        {
            isUp: true,
            isCivilian: false
        },
        {
            isUp: true,
            isCivilian: false
        },
        {
            isUp: true,
            isCivilian: false
        },
        {
            isUp: true,
            isCivilian: false
        },
        {
            isUp: false,
            isCivilian: false
        },
        {
            isUp: true,
            isCivilian: false
        },
        {
            isUp: false,
            isCivilian: false
        },
    ];
    state.players = ['', '']
    state.points = [0, 0];
    state.currentPlayerIdx = 0;
}
function renderBoard() {
    boardElem.innerText = '';
    for(let i=0; i<state.board.length; i++){
        let card = state.board[i]
        // create an HTML element 
        let cellElem = document.createElement('div')
        // add a class, cell, to the div
        cellElem.classList.add('hole')
        // store the index of the card in the board as part of the HTML element attribute dataset
        cellElem.dataset.index = i
        // add the value of the card to the div
        if (card.isUp) cellElem.innerText = "moleMound"

        boardElem.appendChild(cellElem)
    }
}

//start.addEventListener('click', startGame)

boardElem.addEventListener('click', function(event){
    let idx = event.target.dataset.index
    let card = state.board[idx]
    if (card.isUp === true) {
        state.points [state.currentPlayerIdx]++
        console.log(state.points)
    } else {state.points [state.currentPlayerIdx]--

    }
    renderBoard()
})

resetState()
renderBoard()

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelectorAll('.score');
const moles = document.querySelector('.mole');
let lastHole;
let score = 0;
let timeup = false;

function startGame() {
    
}


function randomTime(min, max) {
    return Math.round(Math.random() * (max-min) + min);
}

function randomHole() {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];

    //let previousHole = holes.item(targetHole)
    //previousHole.classList.remove('mole')
    //targetHole = Math.floor(Math.random()* 9)

    if (hole === lastHole) {
        return randomHole();
    }

    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(300, 1000);
    const hole = randomHole();
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        !timeup && peep();
    }, time);
}

window.startGame = function startGame() {
    scoreBoard.textContent = 0
    timeup = false;
    score = 0;
    peep();
    setTimeout(() => (timeUp = true), 10000);
};

function whack(e) {
   if (!e.isTrusted) alert('YOU CHEATED!');
     ++score;
     scoreBoard.textContent = score;
 }

//moles.forEach(mole => mole.addEventListener('click', bonk));





//$('.board').on('click', onBoardClick);




//$(window).on('keydown', function (event) {


//})


