import React from 'react';
import './PhraseDisplay.css'; // Optional: Add styling if needed

const PhraseDisplay = ({ phrase, guessedLetters }) => {
    return (
        <div className="phrase-display">
            {phrase.split('').map((char, index) => {
                if (char === ' ') {
                    return <span key={index} className="space"> </span>;
                }
                return (
                    <span key={index} className={guessedLetters.includes(char.toLowerCase()) ? 'revealed' : 'hidden'}>
                        {guessedLetters.includes(char.toLowerCase()) ? char : '_'}
                    </span>
                );
            })}
        </div>
    );
};

export default PhraseDisplay;