import React from 'react';

const GameOverModal = ({ gameStatus, solutionWord, onRestart }) => {
  const title = gameStatus === 'WON' ? '🎉 You Won!' : '😢 Game Over';
  const message = gameStatus === 'WON' 
    ? 'Congratulations! You found the word!' 
    : `The word was "${solutionWord}"`;
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="modal-button" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;