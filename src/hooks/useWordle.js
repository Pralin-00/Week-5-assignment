import { useState, useCallback } from 'react';

export const useWordle = (solutionWord) => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState('IN_PROGRESS');
  const [keyColors, setKeyColors] = useState({});

  const evaluateGuess = useCallback((guess) => {
    const result = [];
    const solutionArr = solutionWord.split('');
    const guessArr = guess.split('');
    
    // First pass: mark correct letters (green)
    for (let i = 0; i < 5; i++) {
      if (guessArr[i] === solutionArr[i]) {
        result[i] = 'correct';
        solutionArr[i] = null;
        guessArr[i] = null;
      }
    }
    
    // Second pass: mark present letters (yellow)
    for (let i = 0; i < 5; i++) {
      if (guessArr[i] !== null) {
        const index = solutionArr.indexOf(guessArr[i]);
        if (index !== -1) {
          result[i] = 'present';
          solutionArr[index] = null;
        } else {
          result[i] = 'absent';
        }
      }
    }
    
    return result;
  }, [solutionWord]);

  const updateKeyColors = useCallback((guess, evaluation) => {
    const newKeyColors = { ...keyColors };
    
    for (let i = 0; i < 5; i++) {
      const letter = guess[i];
      const status = evaluation[i];
      
      if (!newKeyColors[letter] || 
          (status === 'correct') || 
          (status === 'present' && newKeyColors[letter] !== 'correct')) {
        newKeyColors[letter] = status;
      }
    }
    
    setKeyColors(newKeyColors);
  }, [keyColors]);

  const handleKeyPress = useCallback((key) => {
    if (gameStatus !== 'IN_PROGRESS') return;
    
    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        return;
      }
      
      const evaluation = evaluateGuess(currentGuess);
      const newPastGuesses = [...pastGuesses, currentGuess];
      setPastGuesses(newPastGuesses);
      
      updateKeyColors(currentGuess, evaluation);
      
      if (currentGuess === solutionWord) {
        setGameStatus('WON');
      } else if (newPastGuesses.length >= 6) {
        setGameStatus('LOST');
      }
      
      setCurrentGuess('');
      
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
      
    } else if (key.match(/^[A-Z]$/) && currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, pastGuesses, gameStatus, solutionWord, evaluateGuess, updateKeyColors]);

  const resetGame = useCallback(() => {
    setCurrentGuess('');
    setPastGuesses([]);
    setGameStatus('IN_PROGRESS');
    setKeyColors({});
  }, []);

  return {
    currentGuess,
    pastGuesses,
    gameStatus,
    keyColors,
    handleKeyPress,
    resetGame
  };
};