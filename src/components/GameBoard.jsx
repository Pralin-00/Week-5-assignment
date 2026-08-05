import React from 'react';
import Row from './Row';

const GameBoard = ({ currentGuess, pastGuesses, solutionWord, gameStatus }) => {
  const rows = [];
  
  for (let i = 0; i < pastGuesses.length; i++) {
    rows.push(
      <Row 
        key={`past-${i}`}
        guess={pastGuesses[i]}
        solution={solutionWord}
        isCurrent={false}
        isComplete={true}
      />
    );
  }
  
  if (gameStatus === 'IN_PROGRESS' && pastGuesses.length < 6) {
    rows.push(
      <Row 
        key="current"
        guess={currentGuess}
        solution={solutionWord}
        isCurrent={true}
        isComplete={false}
      />
    );
    
    const remainingRows = 6 - pastGuesses.length - 1;
    for (let i = 0; i < remainingRows; i++) {
      rows.push(
        <Row 
          key={`empty-${i}`}
          guess=""
          solution={solutionWord}
          isCurrent={false}
          isComplete={false}
        />
      );
    }
  } else {
    const remainingRows = 6 - pastGuesses.length;
    for (let i = 0; i < remainingRows; i++) {
      rows.push(
        <Row 
          key={`empty-${i}`}
          guess=""
          solution={solutionWord}
          isCurrent={false}
          isComplete={false}
        />
      );
    }
  }
  
  return (
    <div className="game-board">
      {rows}
    </div>
  );
};

export default GameBoard;