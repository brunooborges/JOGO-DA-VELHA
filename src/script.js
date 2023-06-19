// Initial Data

let board = {
  x1: '',
  x2: '',
  x3: '',
  y1: '',
  y2: '',
  y3: '',
  z1: '',
  z2: '',
  z3: '',
};
let xScore = document.querySelector('.x-score .wins');
let oScore = document.querySelector('.o-score .wins');
let turn = document.querySelector('.turn');
let winner = document.querySelector('.winner');

let randomizer = Math.floor(Math.random() * 2);
let player = randomizer === 0 ? 'x' : 'o';

let playing = true;
let xCounter = 0;
let oCounter = 0;
let message = '';

turn.innerHTML = player;
xScore.innerHTML = xCounter;
oScore.innerHTML = oCounter;

// Functions

function handleItemClick(event) {
  let item = event.target.getAttribute('item-data');
  if (playing && board[item] === '') {
    board[item] = player;

    renderBoard();
    playerTurn();
  }
}

function renderBoard() {
  for (let i in board) {
    let item = document.querySelector(`div[item-data=${i}]`);
    item.innerHTML = board[i];
  }

  checkWinner();
}

function renderInfo() {
  turn.innerHTML = player;
  winner.innerHTML = message;
  xScore.innerHTML = xCounter;
  oScore.innerHTML = oCounter;
}

function playerTurn() {
  player = player === 'x' ? 'o' : 'x';

  renderInfo();
}

function checkWinner() {
  if (playerHasWon('x')) {
    message = `The winner is '${player}'.`;
    xCounter++;
    playing = false;
  } else if (playerHasWon('o')) {
    message = `The winner is '${player}'.`;
    oCounter++;
    playing = false;
  } else if (hasDrawn()) {
    message = `It's a draw.`;
    playing = false;
  }
}

function hasDrawn() {
  for (let i in board) {
    if (board[i] === '') {
      return false;
    }
  }

  return true;
}

function playerHasWon(player) {
  let winningPositions = [
    'x1,x2,x3',
    'y1,y2,y3',
    'z1,z2,z3',
    'x1,y1,z1',
    'x2,y2,z2',
    'x3,y3,z3',
    'x1,y2,z3',
    'x3,y2,z1',
  ];

  for (let i in winningPositions) {
    let positionsArray = winningPositions[i].split(',');
    let playerWon = positionsArray.every((options) => board[options] === player);

    if (playerWon) {
      return true;
    }
  }

  return false;
}

function resetGame() {
  message = '';

  for (let i in board) {
    board[i] = '';
  }

  playing = true;

  renderBoard();
  renderInfo();
}

function resetScore() {
  xCounter = 0;
  oCounter = 0;

  resetGame();
}

// Events

document.querySelector('.reset-game').addEventListener('click', resetGame);
document.querySelector('.reset-score').addEventListener('click', resetScore);
document.querySelectorAll('.item').forEach((item) => {
  item.addEventListener('click', handleItemClick);
});
