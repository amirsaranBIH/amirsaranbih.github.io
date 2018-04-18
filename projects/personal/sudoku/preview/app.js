// Main variables for document elements
var game = document.getElementById('game'),
    time = document.getElementById('time'),
    startButton = document.querySelector('button[name="start-time"]'),
    choseNumberModule = document.getElementById('chose-number');

    var seconds = 0;
    var minutes = 0;
    var timePlaying = 0;

    const numOfBoards = 9;

// Function for initializing the game
function initGame() {
  game.innerHTML = '';
  makeBoards();
  window.timer = setInterval(startTimer, 1000);
  startButton.style.display = 'none';
}

// Making all the boards randomly
function makeBoards() {

  for (let i = 0; i < numOfBoards; i++) {
    let numbers = generateNumbers();

    var board = document.createElement('div');
    board.classList.add('board');

    numbers.forEach(num => {
      let number = document.createElement('div');
      number.classList.add('number');
      number.innerText = num;
      if (!number.innerText) {
        number.addEventListener('click', choseNumber);
      }
      board.appendChild(number);
    });

    game.appendChild(board);
  }

  window.board = document.querySelectorAll('.board');
}

// Generates an array of numbers and blank spaces randomly
function generateNumbers() {
  var randomNumbersArray = [];

  for (let i = 0; i < 9; i++) {
    let willHaveNumber = Math.round(Math.random());

    if (!willHaveNumber) {
      // Adds null (blank space) to array
      randomNumbersArray.push(null);
    } else {
      // Random number from 1 to 9
      let randomNumber = Math.ceil(Math.random() * 9);

      // Checks if the random number is already in array
      while (randomNumbersArray.indexOf(randomNumber) !== -1) {
        randomNumber = Math.ceil(Math.random() * 9);
      }

      randomNumbersArray.push(randomNumber);
    }
  }

  return randomNumbersArray;
}

// Start timer
function startTimer() {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
    if (minutes < 10) { minutes = '0' + minutes; }
  }
  if (minutes === 0) { minutes = '00'; }
  if (seconds < 10) { seconds = '0' + seconds; }

  window.timePlaying  = `${minutes}:${seconds}`;
  time.innerText = timePlaying;
}

// Display the choseNumberModule in correct X and Y position
// and replace the null (blank space) with chosen number
function choseNumber(e) {
  var pageX = e.pageX;
  var pageY = e.pageY;

  // Checks if choseNumberModule will be placed near edges of screen
  // if it will then it moves it from the edge
  if (e.y > window.innerHeight - 130) { pageY -= 130; }
  if (e.y < 130) { pageY += 70; }
  if (e.x > window.innerWidth - 130) { pageX -= 100; }
  if (e.x < 130) { pageX += 100; }

  // Placing the choseNumberModule to the clicked X and Y coordinates
  choseNumberModule.style.left = pageX + 'px';
  choseNumberModule.style.top = pageY + 'px';
  choseNumberModule.style.display = 'block';

  // What blank space to replace with chosen number
  window.numberToReplace = this;
}

choseNumberModule.addEventListener('click', function(e) {
  if (e.target.id !== 'chose-number') {

    var numberToReplace = window.numberToReplace;
    // Adding opacity to differentiate what number is added dynamically by user
    // to not confuse user which number can be changed
    numberToReplace.style.opacity = '0.7';
    numberToReplace.innerText = e.target.innerText;
    choseNumberModule.style.display = 'none';

    // Removes blank spaces (null) from array to count how many
    // elements are in array
    var numbersWithoutSpaces = [...numberToReplace.parentNode.childNodes].filter(num => {
      return num.innerText !== '';
    });

    // Checks if board has full board (no blank spaces)
    if (numbersWithoutSpaces.length === 9) {
      checkBoardCompleted(numberToReplace.parentNode);

      // Checks if all boards are completed
      var allCompleted = [...board].every(b => {
        return b.childNodes[b.childNodes.length - 1].classList.value === 'complete';
      });

      if (allCompleted) {
        wonGame();
      }
    }

  }

});

// Checks if the board is completed correctly
function checkBoardCompleted(board) {
  var boardToCheck = [...board.childNodes];

  // Loops over whole board and sees if there are numbers from 1 to 9
  for (let i = 0; i < boardToCheck.length; i++) {
    var hasAllNumbers = boardToCheck.some(num => {
      return num.innerText == i + 1;
    });

    // If the board doesn't have all the numbers
    if (!hasAllNumbers) { break }
  }

  // If the board is complete
  if (hasAllNumbers) {
    var complete = document.createElement('div');
    complete.classList.add('complete');
    complete.innerText = 'COMPLETED!';

    // Removing all styling from numbers to be consistent for all
    boardToCheck.forEach(number => {
      if (number.style.opacity = '0.7') {
        number.style.opacity = '1';
      }
    });

    board.appendChild(complete);
  }

}

// Winning the game
function wonGame() {
  alert('you won and it took you: ' + timePlaying)
  endGame();
}

function endGame() {
  clearInterval(window.timer);
  time.innerText = '00:00';
}

// Initializing the game
startButton.addEventListener('click', function() {
  initGame();
});
