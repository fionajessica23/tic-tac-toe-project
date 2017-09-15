var boardArr = [];
var clickSymbol = 'x';
var isWinning = false;
var isTie = false;
var numberOfTurn = 0;
var playerxScore = 0;
var playeroScore = 0;

for (var i = 0; i < 9; i++) {
  boardArr[i] = '';
}

var makeTurn = function (event) {

  numberOfTurn += 1;

  var saveBoxId = event.target.id;
  var boxId = saveBoxId.slice(-1);

  //check if game is already won, call nextRound
  if (isWinning || isTie) {
    nextRound();
    return;
  }
  // if that particular elem in the array already filled in
  // with x or o, then exit from the function
  if (boardArr[boxId-1] !== '' ) {
    return;
  }

  event.target.textContent = clickSymbol; // set content to value
  boardArr[boxId-1] = clickSymbol; //set board array

  checkResult(clickSymbol);

  // alternate X and O
  if (clickSymbol === 'x') { // if current value = x
    clickSymbol = 'o'; // set current value to o
  } else {
    clickSymbol = 'x'; // set current value to x
  }
}

for (var i = 1; i <= 9; i++) {
  var id = '#box-' + i
  document.querySelector(id).addEventListener('click', makeTurn);
}

var checkResult = function (symbol) {
// check all value of each boxes
  // check rows if they are the same value
  if (
      (boardArr[0] === symbol && boardArr[1] === symbol && boardArr[2] === symbol) ||
      (boardArr[3] === symbol && boardArr[4] === symbol && boardArr[5] === symbol) ||
      (boardArr[6] === symbol && boardArr[7] === symbol && boardArr[8] === symbol)
     )
  {
    isWinning = true;
    showResult(symbol);

  // check columns if they are the same value
  } else if (
    (boardArr[0] === symbol && boardArr[3] === symbol && boardArr[6] === symbol) ||
    (boardArr[1] === symbol && boardArr[4] === symbol && boardArr[7] === symbol) ||
    (boardArr[2] === symbol && boardArr[5] === symbol && boardArr[8] === symbol)
    )
  {
    isWinning = true;
    showResult(symbol);

  // check diagonals if they are the same value
  } else if (
    (boardArr[0] === symbol && boardArr[4] === symbol && boardArr[8] === symbol) ||
    (boardArr[2] === symbol && boardArr[4] === symbol && boardArr[6] === symbol)
    )
  {
    isWinning = true;
    showResult(symbol);
  }
 // check if tie
  // if total box flipped == 9 then set tie = true
  if (numberOfTurn === 9 && isWinning === false) {
    isTie = true;
    showResult('tie');
  }
}
//otherwise keep playing

var showResult = function (symbol) {
  if (symbol === 'tie') {
    document.querySelector('#display-winner').textContent = "It's a tie!";
    var audio = new Audio('tie.mp3');
    audio.play();
  } else {
    document.querySelector('#display-winner').textContent = symbol + ' is winning!';
    if (symbol === 'x') {
      playerxScore += 1;
      document.querySelector('#score-x').textContent = playerxScore;
    } else {
      playeroScore += 1;
      document.querySelector('#score-o').textContent = playeroScore;
    }
    var audio = new Audio('win.mp3');
    audio.play();
  }
  document.querySelector('#instruction').style.visibility = 'hidden';
}


var nextRound = function () {
  document.querySelector('#display-winner').textContent = "Let's play!";
  document.querySelector('#instruction').style.visibility = 'visible';
  numberOfTurn = 0;

  //clear all x and o from board game
  for (var i = 1; i <= 9; i++) {
    var id = '#box-' + i;
    document.querySelector(id).textContent = '';
  }
  //clear all elements in boardArr array
  for (var i = 0; i < 9; i++) {
    boardArr[i] = '';
  }
  isWinning = false;
  isTie = false;
  clickSymbol = 'x';
}


var resetGame = function () {
  document.querySelector('#display-winner').textContent = "Let's play!";
  document.querySelector('#instruction').style.visibility = 'visible';
  numberOfTurn = 0;
  playerxScore = 0;
  playeroScore = 0;
  document.querySelector('#score-x').textContent = playerxScore;
  document.querySelector('#score-o').textContent = playeroScore;

  //clear all x and o from board game
  for (var i = 1; i <= 9; i++) {
    var id = '#box-' + i;
    document.querySelector(id).textContent = '';
  }
  //clear all elements in boardArr array
  for (var i = 0; i < 9; i++) {
    boardArr[i] = '';
  }
  isWinning = false;
  isTie = false;
  clickSymbol = 'x';
}

document.querySelector('#next-round').addEventListener('click', nextRound);
document.querySelector('#reset-game').addEventListener('click', resetGame);
