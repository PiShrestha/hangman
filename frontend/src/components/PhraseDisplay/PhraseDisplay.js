import React from 'react';
import './PhraseDisplay.css'; // Optional: Add styling if needed

const PhraseDisplay = ({ phrase, guessedLetters }) => {
    return (
        <div className="phrase-display">
            {phrase.split('').map((char, index) => {
                if (char === ' ') {
                    return <span key={index}> </span>; // Replace space with an underscore
                }
                return (
                    <span key={index}>
                        {guessedLetters.includes(char.toLowerCase()) ? char : '_'}
                    </span>
                );
            })}
        </div>
    );
};

export default PhraseDisplay;