let intialState;

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelectorAll('.score');
const moles = document.querySelector('.mole');
let lastHole;
let score = 0;
let timeup = false;

function randomTime(min, max) {
    return Math.round(Math.random() * (max-min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];

    if (hole === lastHole) {
        return randomHole(holes);
    }

    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(300, 1000);
    const hole = randomHole(holes);
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

moles.forEach(mole => mole.addEventListener('click', bonk));

function buildInitialState() {


}



function renderState() {


}


function onBoardClick() {



    renderState()
}

$('.board').on('click', onBoardClick);


function tick() {


    renderState()
}

setInterval(tick, 1000 / 30)


$(window).on('keydown', function (event) {


})


let gameState = {
    grid: [
        {
            isUp: false,
            isCivilian: false
        },


    ],
    points: 0,
}

