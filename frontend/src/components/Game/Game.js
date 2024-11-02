import React, { useState, useEffect } from 'react';
import PhraseDisplay from '../PhraseDisplay/PhraseDisplay';
import Keyboard from '../Keyboard/Keyboard';
import Controls from '../Controls/Controls';
import MiniGame from '../MiniGame/MiniGame';
import { getImageUrl } from '../../utils';
import './Game.css';

const Game = ({ phrase }) => {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [currency, setCurrency] = useState(100);
  const [showMiniGame, setShowMiniGame] = useState(false);

  const handleGuess = (letter) => {
    const letterLowerCase = letter.toLowerCase(); // Convert to lowercase for case insensitivity

    // Check if the letter has already been guessed
    if (guessedLetters.includes(letterLowerCase) || remainingAttempts <= 0) {
      return; // Do nothing if already guessed or no attempts left
    }

    // Add the guessed letter to the list of guessed letters
    setGuessedLetters((prev) => [...prev, letterLowerCase]);

    // Check if the letter is in the phrase
    if (phrase.toLowerCase().includes(letterLowerCase)) {
      // Correct guess logic (update state, etc.)
    } else {
      // Update the remaining attempts for an incorrect guess
      setRemainingAttempts((prev) => prev - 1);
    }

    // Check for win/loss conditions after each guess
    checkGameStatus();
  };

  const restartGame = () => {
    setGuessedLetters([]);
    setRemainingAttempts(6);
    setIsGameOver(false);
    setHasWon(false);
    setCurrency(100); // Reset currency
    // Optionally, reset the phrase if needed, depending on your game's design
  };

  const checkGameStatus = () => {
    const allLettersGuessed = phrase
      .toLowerCase()
      .split('')
      .every(letter => letter === ' ' || guessedLetters.includes(letter)); // Include space as a valid "guess"
  
    if (allLettersGuessed) {
      setIsGameOver(true);
      setHasWon(true);
    } else if (remainingAttempts <= 0) {
      setIsGameOver(true);
      setHasWon(false);
    }
  };

  const useHint = () => {
    if (currency >= 20) {
      const unguessedLetters = phrase
        .toLowerCase()
        .split('')
        .filter(letter => !guessedLetters.includes(letter) && letter !== ' ');
  
      if (unguessedLetters.length > 0) {
        const randomLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
        setGuessedLetters(prev => [...prev, randomLetter]); // Add the letter to guessed letters
        setCurrency(prev => prev - 20); // Deduct the cost
      }
    } else {
      alert("Not enough currency to use a hint!");
    }
  };

  const buyExtraAttempt = () => {
    if (currency >= 50) { // Example cost for an extra attempt
      setRemainingAttempts(prev => prev + 1);
      setCurrency(prev => prev - 50); // Deduct the cost
    } else {
      alert("Not enough currency to buy an extra attempt!");
    }
  };

  // Keyboard event handler
  const handleKeyPress = (event) => {
    const letter = event.key.toUpperCase(); // Convert key to uppercase
    if (/^[A-Z]$/.test(letter)) { // Check if the key pressed is a letter A-Z
      handleGuess(letter);
    }
  };

  // Set up keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [guessedLetters, remainingAttempts]); // Dependencies for re-adding the listener

  return (
    <div className="game-container">
      <h2>Guess the Phrase!</h2>
      <img src={getImageUrl('hangman/initial.png')} alt="Initial Hangman Image" className="image" />
      <p>Your Currency: {currency}</p>
      <p>Remaining Attempts: {remainingAttempts}</p>
      <PhraseDisplay phrase={phrase} guessedLetters={guessedLetters} />
      <Keyboard handleGuess={handleGuess} />
      <Controls 
        useHint={useHint} 
        buyExtraAttempt={buyExtraAttempt} 
        restartGame={restartGame} 
        setShowMiniGame={setShowMiniGame} 
      />
      {showMiniGame && <MiniGame />}
      {isGameOver && <div>{hasWon ? "You Win!" : `You Lose! The phrase was: ${phrase}`}</div>}
    </div>
  );
};

export default Game;
