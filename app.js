let intialState;

let state = {}
let boardElem = document.getElementById('game');

function resetState() {
    state.board = [
        {
            isUp: false,
            isCivilian: false
        },
        {
            isUp: false,
            isCivilian: false
        },
        {
            isUp: false,
            isCivilian: false
        },
        {
            isUp: false,
            isCivilian: false
        },
        {
            isUp: false,
            isCivilian: false
        },
        {
            isUp: false,
            isCivilian: false
        },
        {
            isUp: false,
            isCivilian: false
        },
        {
            isUp: false,
            isCivilian: false
        },
        {
            isUp: false,
            isCivilian: false
        },
    ];
    state.lastHoleIdx = -1;
    state.players = ['', '']
    state.points = [0, 0];
    state.currentPlayerIdx = 0;
}
function renderBoard() {
    boardElem.innerText = '';
    for(let i=0; i<state.board.length; i++){
        //for(let j=0; j<state.board.length; j++) {
        let card = state.board[i]
        // create an HTML element 
        let cellElem = document.createElement('div')
        // add a class, cell, to the div
        cellElem.classList.add('hole')
        // store the index of the card in the board as part of the HTML element attribute dataset
        cellElem.dataset.index = [i]
        // add the value of the card to the div
        if (card.isUp) cellElem.innerText = "moleMound"


        boardElem.appendChild(cellElem)
       // }
    }
}

let start = document.getElementById('StartGame')
console.log(start)

start.addEventListener('click', function startGame(event){
    //every x number of seconds, get a random hole on screen to show a mole
    //make sure that after x seconds that mole disappears
    console.log('game started')

    let hole = randomHole()
    hole.isUp = true
    renderBoard()
    setTimeout(function down() {
            hole.isUp = false
            renderBoard()
    }, 5000) 

})

boardElem.addEventListener('click', function(event){
    let idx = event.target.dataset.index
    let card = state.board[idx]
    if (card.isUp === true) {
        state.points[state.currentPlayerIdx]++
        console.log(state.points)
    } else {state.points[state.currentPlayerIdx]--

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

function randomTime(min, max) {
    return Math.round(Math.random() * (max-min) + min);
}

function randomHole() {
    const idx = Math.floor(Math.random() * state.board.length);
    //console.log(idx)
    if (idx === state.lastHoleIdx) {
        return randomHole();
    }

    setInterval(function() {
        const randomHoleIdx = Math.floor(Math.random() * holes.length);
        holes[randomHoleIdx].classList.toggle('mole');
    }, 300);

    const hole = state.board[idx];

    state.lastHoleIdx = idx;
    return hole;
}
randomHole()

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


