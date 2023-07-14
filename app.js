// Array con las cartas del juego
const cards = ['&#x2600;', '&#x2602;', '&#x2605;', '&#x2690;', '&#x2694;', '&#x2699;', '&#x269B;', '&#x26A1;'];

// Duplicamos las cartas para tener los pares
const cardPairs = cards.concat(cards);

// Barajar las cartas de forma aleatoria
cardPairs.sort(() => Math.random() - 0.5);

let flippedCards = []; // Cartas volteadas
let matchedCards = []; // Cartas coincidentes

const board = document.getElementById('memory-board');

// Crear las cartas en el tablero
cardPairs.forEach((card, index) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.dataset.cardIndex = index;

  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  const cardFront = document.createElement('div');
  cardFront.classList.add('card-face', 'card-front');

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-face', 'card-back');
  cardBack.innerHTML = card;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  cardElement.appendChild(cardInner);

  cardElement.addEventListener('click', flipCard);
  board.appendChild(cardElement);
});

// Función para voltear una carta
function flipCard() {
  if (flippedCards.length < 2 && !matchedCards.includes(this) && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 700);
    }
  }
}

// Función para comprobar si las cartas coinciden
function checkMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];

  const card1Index = card1.dataset.cardIndex;
  const card2Index = card2.dataset.cardIndex;

  if (cardPairs[card1Index] === cardPairs[card2Index]) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards = [];

  if (matchedCards.length === cardPairs.length) {
    showGameEndMessage();
  }
}

// Función para mostrar un mensaje de fin de juego
function showGameEndMessage() {
  const gameEndMessage = document.createElement('div');
  gameEndMessage.classList.add('game-end-message');
  gameEndMessage.textContent = '¡Felicidades! Has encontrado todas las parejas.';
  board.appendChild(gameEndMessage);
}
