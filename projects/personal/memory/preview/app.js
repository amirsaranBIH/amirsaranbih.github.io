// Data Controller
var dataContoller = (function() {

// Number of cards to be displayed
const numberOfCards = 36;
var cards = [];

// Creates card and pushes into cards array
function createCard(index) {
  cards.push({
    id: index,
    image: `images/card${index}.png`
  });
}

// Making cards and returns shuffled cards
function makeCards() {
  for (let i = 0; i < numberOfCards / 2; i++) {
    createCard(i);
  }
  cards = shuffleCards(cards.concat(cards));
  return cards;
}

// Shuffles all the cards
function shuffleCards(array) {
  for (let i = 0; i < array.length; i++) {
    // Removing the first card from array and placing it randomly into array
    let randomCard = Math.ceil(Math.random() * array.length);
    let removedCard = array.shift();
    array.splice(randomCard, 0, removedCard);
  }

  return array;
}

return {
  // Returns array of all cards
  makeCards() {
    return makeCards();
  },
  // Gets the number of cards
  getNumberOfCards() {
    return numberOfCards;
  }
}

}());


// UI Controller
var UIController = (function() {

// DOM variables
const DOM = {
  game: '#game',
  win_modal: '#win-modal',
  card: '.card',
  flipped_cards: '.flipped-card',
  completed_cards: '.completed-card',
  play_again: '#play-again'
};

return {
  // Returns the DOM object
  getDOM() {
    return DOM;
  },
  cardTemplate(array, index) {
    return `<div class="card" data-id="${array[index].id}"><img src="${array[index].image}" alt="Card ${array[index].id}"></div>`;
  },
  // Rendering all cards in DOM
  render(template) {
      document.querySelector(DOM.game).insertAdjacentHTML('beforeend', template);
  },
  // Checks if all cards are completed
  checkCompleted() {
    return [...document.querySelectorAll(DOM.card)].every(card => {
      return card.classList.value.includes('completed-card');
    });
  },
  // Renders win modal
  renderWinModal(display) {
    document.querySelector(DOM.win_modal).style.display = display;
  },
  // Clears all cards
  clearGame() {
    document.querySelector(DOM.game).innerHTML = '';
  },
  // Set a timeout
  timeout(f, time) {
    setTimeout(() => {
      f();
    }, time);
  }
}

}());


// Controller
var controller = (function(dataCtrl, UICtrl) {

var DOM = UICtrl.getDOM();
var cards = dataCtrl.makeCards();

function setUpGame(cards) {
  for (let i = 0; i < dataCtrl.getNumberOfCards(); i++) {
    let cardTemplate = UICtrl.cardTemplate(cards, i);
    UICtrl.render(cardTemplate);
  }
}

// Setting up events for cards
function setEvents() {
  var clickable = true;
  document.querySelector(DOM.game).addEventListener('click', (e) => {
    // Checking if clicked card is clickable and does it have the 'flipped-card' or 'completed-card' class
    if (!e.target.id && e.target.classList[1] !== 'flipped-card' && clickable && !e.target.classList.value.includes('completed-card')) {
      e.target.classList.add('flipped-card');
      checkMatch(e);
      clickable = !clickable;
      UICtrl.timeout(() => {clickable = !clickable}, 500);
    }
  });

  // Setting game again when clicked  button
  document.querySelector(DOM.play_again).addEventListener('click', () => {
    UICtrl.clearGame();

    newCards = dataCtrl.makeCards();
    setUpGame(newCards);
    UICtrl.renderWinModal('none');
  });
}

// Checks if the two clicked cards match
function checkMatch(event) {
  var flippedCards = [...document.querySelectorAll(DOM.flipped_cards)];

  if (flippedCards.length === 2) {
    // If it matches they get a class 'completed-card'
    if (flippedCards[0].dataset.id === flippedCards[1].dataset.id) {
      flippedCards.forEach(card => {
        card.classList.remove('flipped-card');
        card.classList.add('completed-card');
      });

      winCheck();
    // If they don't match they flip over
    } else {
      flippedCards.forEach(card => {
        UICtrl.timeout(() => { card.classList.remove('flipped-card'); }, 800);
      });
    }
  }
}

// Checks if all cards are finished
function winCheck() {
  // If finished show win modal
  if (UICtrl.checkCompleted()) {
    UICtrl.renderWinModal('block');
  }
}

return {
  init() {
    setEvents();
    setUpGame(cards);
  }
}

}(dataContoller, UIController));

// Initializing game and all the events
controller.init();
