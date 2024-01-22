document.addEventListener('DOMContentLoaded', () => {
  const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  let flippedCards = [];
  let matchedCards = [];

  const memoryBoard = document.getElementById('memory-board');

  // Shuffle the cards
  cards.sort(() => Math.random() - 0.5);

  // Create the board
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = index;
    cardElement.textContent = card;
    cardElement.addEventListener('click', flipCard);
    memoryBoard.appendChild(cardElement);
  });

  function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this)) {
      this.classList.add('flipped');
      flippedCards.push(this);

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
      }
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.textContent === card2.textContent) {
      matchedCards.push(card1, card2);
      if (matchedCards.length === cards.length) {
        alert('¡Felicidades! Has ganado el juego.');
      }
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }

    flippedCards = [];
  }
});