//note to do
// update flowchart
// update css
// update comments on lines in JS



var clickSymbol = 'x';

// init board array by set values to ''
var boardArr = [];
var isWinning = false;
var isTie = false;
var numberOfTurn = 0;

for (var i = 0; i < 9; i++) {
  boardArr[i] = '';
}

var clickedBox = function (event) {
// alternate X and O
  // if current value = X:
  // show x
  // set current value to o
  //
  //
  // if current value = o
  // show o
  // set current value to x
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

  if (clickSymbol === 'x') {
  clickSymbol = 'o';

  } else {
  clickSymbol = 'x';

  }
  checkResult();
}


var checkResult = function () {
// check all value of each boxes
  // check rows if they are the same value
  if (
      (boardArr[0] === 'x' && boardArr[1] === 'x' && boardArr[2] === 'x') ||
      (boardArr[3] === 'x' && boardArr[4] === 'x' && boardArr[5] === 'x') ||
      (boardArr[6] === 'x' && boardArr[7] === 'x' && boardArr[8] === 'x')
     )
  {
    isWinning = true;
    showResult('x');
  // check columns if they are the same value
  } else if (
    (boardArr[0] === 'x' && boardArr[3] === 'x' && boardArr[6] === 'x') ||
    (boardArr[1] === 'x' && boardArr[4] === 'x' && boardArr[7] === 'x') ||
    (boardArr[2] === 'x' && boardArr[5] === 'x' && boardArr[8] === 'x')
    )
  {
    isWinning = true;
    showResult('x');
  // check diagonals if they are the same value
  } else if (
    (boardArr[0] === 'x' && boardArr[4] === 'x' && boardArr[8] === 'x') ||
    (boardArr[2] === 'x' && boardArr[4] === 'x' && boardArr[6] === 'x')
    )
  {
    isWinning = true;
    showResult('x');
    // check rows if they are the same value
  } else if (
      (boardArr[0] === 'o' && boardArr[1] === 'o' && boardArr[2] === 'o') ||
      (boardArr[3] === 'o' && boardArr[4] === 'o' && boardArr[5] === 'o') ||
      (boardArr[6] === 'o' && boardArr[7] === 'o' && boardArr[8] === 'o')
     )
  {
    isWinning = true;
    showResult('o');
  // check columns if they are the same value
  } else if (
    (boardArr[0] === 'o' && boardArr[3] === 'o' && boardArr[6] === 'o') ||
    (boardArr[1] === 'o' && boardArr[4] === 'o' && boardArr[7] === 'o') ||
    (boardArr[2] === 'o' && boardArr[5] === 'o' && boardArr[8] === 'o')
    )
  {
    isWinning = true;
    showResult('o');
  // check diagonals if they are the same value
  } else (
    (boardArr[0] === 'o' && boardArr[4] === 'o' && boardArr[8] === 'o') ||
    (boardArr[2] === 'o' && boardArr[4] === 'o' && boardArr[6] === 'o')
    )
  {
    isWinning = true;
    showResult('o');
  }

 // check if tie
  // if total box flipped == 9 then set tie = true
  if (numberOfTurn === 9 && isWinning === false) {
    isTie = true;
    showResult('tie');
  }
}
//otherwise keep playing


//option 1: using object by assigning every boxes to unique property
//pro: easy to compare values using their unique keys to check winning
//cons: can not use loop, it's required to reset the game easily


// use this
//option 2: using 1 array containing 9 elements
//pro: easier to reset the game by using loop to clear values
    // easier to set size of the boards
    // easier to access the element values

var showResult = function (symbol) {
  if (symbol === 'tie') {
    document.querySelector('#display-winner').textContent = "It's a tie";
  } else {
    document.querySelector('#display-winner').textContent = symbol + ' is the winner';
  }
}


var resetGame = function () {
  //clear textContent from #display-winner
  document.querySelector('#display-winner').textContent = '';

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
  document.querySelector(id).addEventListener('click', clickedBox);
}
