import React from 'react';
import './Keyboard.css';

const Keyboard = ({ handleGuess }) => {
  return (
    <div className="keyboard-container">
      {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
        <button key={letter} className="keyboard-button" onClick={() => handleGuess(letter)}>
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
