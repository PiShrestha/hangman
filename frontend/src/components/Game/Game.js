import React, { useState, useEffect } from 'react';
import PhraseDisplay from '../PhraseDisplay/PhraseDisplay';
import Keyboard from '../Keyboard/Keyboard';
import Controls from '../Controls/Controls';
import MiniGame from '../MiniGame/MiniGame';
import { getImageUrl } from '../../utils';
import './Game.css';

const Game = ({ phrase, onRestartGame }) => {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [currency, setCurrency] = useState(100);
  const [showMiniGame, setShowMiniGame] = useState(false);

  const handleGuess = (letter) => {
    const letterLowerCase = letter.toLowerCase();

    if (guessedLetters.includes(letterLowerCase) || remainingAttempts <= 0) {
      alert(`This letter '${letter}' has already been guessed!`);
      return;
    }

    setGuessedLetters((prev) => [...prev, letterLowerCase]);

    if (!phrase.toLowerCase().includes(letterLowerCase)) {
      setRemainingAttempts((prev) => prev - 1);
    }

    checkGameStatus();
  };

  const resetGame = () => {
    setGuessedLetters([]);
    setRemainingAttempts(6);
    setIsGameOver(false);
    setHasWon(false);
    setCurrency(100);
    onRestartGame(); // Call the parent component's restart function
  };

  const checkGameStatus = () => {
    const allLettersGuessed = phrase
      .toLowerCase()
      .split('')
      .every(letter => letter === ' ' || guessedLetters.includes(letter)); 

    if (allLettersGuessed) {
      setIsGameOver(true);
      setHasWon(true);
    } else if (remainingAttempts <= 0) {
      alert('You lost the Game! Click on try again if you want to play again');
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
        setGuessedLetters(prev => [...prev, randomLetter]);
        setCurrency(prev => prev - 20);
      }
    } else {
      alert("Not enough currency to use a hint!");
    }
  };

  const buyExtraAttempt = () => {
    if (currency >= 50) {
      setRemainingAttempts(prev => prev + 1);
      setCurrency(prev => prev - 50);
    } else {
      alert("Not enough currency to buy an extra attempt!");
    }
  };

  const handleKeyPress = (event) => {
    const letter = event.key.toUpperCase();
    if (/^[A-Z]$/.test(letter)) {
      handleGuess(letter);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [guessedLetters, remainingAttempts]);

  return (
    <div className="container">
      <h2>Guess the Phrase!</h2>
      <div className="game-layout">
        <img src={getImageUrl('hangman/initial.png')} alt="Initial Hangman Image" className="image" />
        <div className="right-section">
          <PhraseDisplay phrase={phrase} guessedLetters={guessedLetters} />
          <Keyboard handleGuess={handleGuess} />
          <p>Your Currency: {currency}</p>
          <p>Remaining Attempts: {remainingAttempts}</p>
        </div>
      </div>
      <div className="controls">
        <Controls 
          useHint={useHint} 
          buyExtraAttempt={buyExtraAttempt} 
          restartGame={resetGame} 
          setShowMiniGame={setShowMiniGame} 
        />
        {showMiniGame && <MiniGame />}
        {isGameOver && <div>{hasWon ? "You Win!" : `You Lose! The phrase was: ${phrase}`}</div>}
      </div>
    </div>
  );
};

export default Game;