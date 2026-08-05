import React from 'react';
import Tile from './Tile';

const Row = ({ guess, solution, isCurrent, isComplete }) => {
  const getTileStatus = (index) => {
    if (!isComplete || !guess || guess.length < 5) return 'empty';
    
    const letter = guess[index];
    if (!letter) return 'empty';
    
    const solutionArr = solution.split('');
    const guessArr = guess.split('');
    
    // First pass: check for exact matches
    if (guessArr[index] === solutionArr[index]) {
      return 'correct';
    }
    
    // Mark exact matches as used
    for (let i = 0; i < 5; i++) {
      if (guessArr[i] === solutionArr[i]) {
        solutionArr[i] = null;
        guessArr[i] = null;
      }
    }
    
    // Check if letter exists in remaining solution
    const letterIndex = solutionArr.indexOf(letter);
    if (letterIndex !== -1) {
      return 'present';
    }
    
    return 'absent';
  };
  
  const renderTiles = () => {
    const tiles = [];
    for (let i = 0; i < 5; i++) {
      let status = 'empty';
      let value = '';
      
      if (isComplete && guess && guess.length === 5) {
        status = getTileStatus(i);
        value = guess[i] || '';
      } else if (isCurrent && guess) {
        value = guess[i] || '';
        status = value ? 'filled' : 'empty';
      } else {
        value = '';
        status = 'empty';
      }
      
      tiles.push(
        <Tile 
          key={i}
          value={value}
          status={status}
        />
      );
    }
    return tiles;
  };
  
  return (
    <div className="row">
      {renderTiles()}
    </div>
  );
};

export default Row;