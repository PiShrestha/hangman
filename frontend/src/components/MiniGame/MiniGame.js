import React, { useState } from 'react';
import TriviaGame from './games/TriviaGame';
import RockPaperScissors from './games/RockPaperScissors';
import QuickPuzzle from './games/QuickPuzzle';

const MiniGame = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const renderSelectedGame = () => {
    switch (selectedGame) {
      case 'Quick Puzzle':
        return <QuickPuzzle />;
      case 'Trivia':
        return <TriviaGame />;
      case 'Rock-Paper-Scissors':
        return <RockPaperScissors />;
      default:
        return <div>Please select a mini-game to start.</div>;
    }
  };

  return (
    <div className="mini-game">
      {!selectedGame ? (
        <div>
          <h3>Select a Mini-Game</h3>
          <button onClick={() => handleGameSelect('Quick Puzzle')}>Quick Puzzle</button>
          <button onClick={() => handleGameSelect('Trivia')}>Trivia</button>
          <button onClick={() => handleGameSelect('Rock-Paper-Scissors')}>Rock-Paper-Scissors</button>
        </div>
      ) : (
        renderSelectedGame()
      )}
      {selectedGame && <button onClick={() => setSelectedGame(null)}>Back to Game Selection</button>}
    </div>
  );
};

export default MiniGame;
