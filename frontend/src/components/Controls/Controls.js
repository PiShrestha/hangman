import React from 'react';

const Controls = ({ useHint, buyExtraAttempt, restartGame, setShowMiniGame }) => {
  return (
    <div>
      <button onClick={useHint}>Use Hint (20 coins)</button>
      <button onClick={buyExtraAttempt}>Buy Extra Attempt (50 coins)</button>
      <button onClick={restartGame}>Restart Game</button>
      <button onClick={() => setShowMiniGame(true)}>Play Mini-Game</button>
    </div>
  );
};

export default Controls;
