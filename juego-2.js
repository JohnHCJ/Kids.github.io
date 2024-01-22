document.addEventListener('DOMContentLoaded', () => {
    const words = ['javascript', 'html', 'css', 'developer', 'programming', 'openai', 'gpt', 'computer'];
    let selectedWord = '';
    let guessedWord = [];
    let wrongLetters = [];
    let hangmanImageIndex = 0;
  
    const wordDisplay = document.getElementById('word-display');
    const wrongLettersDisplay = document.getElementById('wrong-letters');
    const hangmanImg = document.getElementById('hangman-img');
    const restartButton = document.getElementById('restart-button');
  
    function initializeGame() {
      // Choose a random word
      selectedWord = words[Math.floor(Math.random() * words.length)];
  
      // Initialize guessedWord array with underscores
      guessedWord = Array(selectedWord.length).fill('_');
  
      // Clear wrong letters array
      wrongLetters = [];
  
      // Reset hangman image
      hangmanImageIndex = 0;
  
      // Display initial state
      displayWord();
      displayWrongLetters();
      displayHangmanImage();
    }
  
    function displayWord() {
      wordDisplay.textContent = guessedWord.join(' ');
    }
  
    function displayWrongLetters() {
      wrongLettersDisplay.textContent = `Letras incorrectas: ${wrongLetters.join(', ')}`;
    }
  
    function displayHangmanImage() {
      hangmanImg.style.backgroundImage = `url('hangman${hangmanImageIndex}.png')`;
    }
  
    function checkWin() {
      if (!guessedWord.includes('_')) {
        alert('¡Felicidades! Has ganado. La palabra es: ' + selectedWord);
        initializeGame();
      }
    }
  
    function checkLoss() {
      if (hangmanImageIndex === 6) {
        alert('Lo siento, has perdido. La palabra era: ' + selectedWord);
        initializeGame();
      }
    }
  
    function updateHangmanImage() {
      hangmanImageIndex++;
      displayHangmanImage();
    }
  
    function handleGuess(letter) {
      if (selectedWord.includes(letter)) {
        // Update guessedWord with correct guesses
        for (let i = 0; i < selectedWord.length; i++) {
          if (selectedWord[i] === letter) {
            guessedWord[i] = letter;
          }
        }
        displayWord();
        checkWin();
      } else {
        // Update wrongLetters array
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          displayWrongLetters();
          updateHangmanImage();
          checkLoss();
        }
      }
    }
  
    document.addEventListener('keydown', (event) => {
      const letter = event.key.toLowerCase();
      if (/^[a-z]$/.test(letter)) {
        handleGuess(letter);
      }
    });
  
    restartButton.addEventListener('click', initializeGame);
  
    // Start the initial game
    initializeGame();
  });