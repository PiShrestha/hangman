import React from 'react';

const Keyboard = ({ handleGuess }) => {
  return (
    <div>
      {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
        <button key={letter} onClick={() => handleGuess(letter)}>
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
