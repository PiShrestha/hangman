import React from 'react';
import './Keyboard.css';

const Keyboard = ({ handleGuess, guessedLetters, phrase }) => {
  const getButtonClass = (letter) => {
    if (guessedLetters.includes(letter.toLowerCase())) {
      // Check if the guessed letter is correct or incorrect
      if (phrase.toLowerCase().includes(letter.toLowerCase())) {
        return 'keyboard-button correct'; 
      } else {
        return 'keyboard-button incorrect'; 
      }
    }
    return 'keyboard-button'; 
  };

  return (
    <div className="keyboard-container">
      {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
        <button
          key={letter}
          className={getButtonClass(letter)}
          onClick={() => handleGuess(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
