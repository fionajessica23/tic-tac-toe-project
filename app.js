//note to do
// add approach to the readme.md file
// update comments on lines in JS
// check the layout on windows and mac
// add the sound for winning
// need to do if possible, listing how many rounds and the score for each players

//option 1: using object by assigning every boxes to unique property
//pro: easy to compare values using their unique keys to check winning
//cons: can not use loop, it's required to reset the game easily


// use this
//option 2: using 1 array containing 9 elements
//pro: easier to reset the game by using loop to clear values
    // easier to set size of the boards
    // easier to access the element values

var boardArr = [];
var clickSymbol = 'x';
var isWinning = false;
var isTie = false;
var numberOfTurn = 0;

for (var i = 0; i < 9; i++) {
  boardArr[i] = '';
}

var makeTurn = function (event) {

  numberOfTurn += 1;

  var saveBoxId = event.target.id;
  var boxId = saveBoxId.slice(-1);

  //check if game is already won, call resetGame
  if (isWinning || isTie) {
    resetGame();
    return;
  }
  // if that particular elem in the array already filled in
  // with x or o, then exit from the function
  if (boardArr[boxId-1] !== '' ) {
    console.log(boardArr);
    return;
  }

  event.target.textContent = clickSymbol; // set content to value
  //set board array
  boardArr[boxId-1] = clickSymbol;

  checkResult(clickSymbol);

  // alternate X and O
  if (clickSymbol === 'x') { // if current value = x
    clickSymbol = 'o'; // set current value to o
  } else {
    clickSymbol = 'x'; // set current value to x
  }
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
    document.querySelector('#display-winner').textContent = "It's a tie";
    var audio = new Audio('tie.mp3');
    audio.play();
  } else {
    document.querySelector('#display-winner').innerHTML = symbol + ' is winning!';
    var audio = new Audio('win.mp3');
    audio.play();
  }
  document.querySelector('#instruction').style.visibility = 'hidden';
}


var resetGame = function () {
  //clear textContent from #display-winner
  document.querySelector('#display-winner').textContent = "Let's play!";
  document.querySelector('#instruction').style.visibility = 'visible';
  numberOfTurn = 0;

  //clear all elements in boardArr array
  for (var i = 1; i <= 9; i++) {
    var id = '#box-' + i;
    document.querySelector(id).textContent = '';
  }

  for (var i = 0; i < 9; i++) {
    boardArr[i] = '';
  }
  isWinning = false;
  isTie = false;
  clickSymbol = 'x';
}


for (var i = 1; i <= 9; i++) {
  var id = '#box-' + i
  document.querySelector(id).addEventListener('click', makeTurn);
}

document.querySelector('#reset-btn').addEventListener('click', resetGame);
