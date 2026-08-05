import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import GameOverModal from './components/GameOverModal';
import { useWordle } from './hooks/useWordle';
import { WORDS } from './constants/words';

function App() {
  const [solutionWord, setSolutionWord] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const {
    currentGuess,
    pastGuesses,
    gameStatus,
    keyColors,
    handleKeyPress,
    resetGame
  } = useWordle(solutionWord);

  // Select random word on mount
  useEffect(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setSolutionWord(randomWord.toUpperCase());
  }, []);

  // Handle game over
  useEffect(() => {
    if (gameStatus === 'WON' || gameStatus === 'LOST') {
      setIsGameOver(true);
      setTimeout(() => setShowModal(true), 1500);
    }
  }, [gameStatus]);

  // Handle physical keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isGameOver) return;
      
      const key = e.key;
      
      if (key === 'Enter') {
        e.preventDefault();
        handleKeyPress('ENTER');
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleKeyPress('BACKSPACE');
      } else if (key.length === 1 && key.match(/[a-zA-Z]/)) {
        e.preventDefault();
        handleKeyPress(key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress, isGameOver]);

  const handleRestart = () => {
    const newWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setSolutionWord(newWord.toUpperCase());
    resetGame();
    setIsGameOver(false);
    setShowModal(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wordle</h1>
      </header>
      
      <GameBoard 
        currentGuess={currentGuess}
        pastGuesses={pastGuesses}
        solutionWord={solutionWord}
        gameStatus={gameStatus}
      />
      
      <Keyboard 
        onKeyPress={handleKeyPress}
        keyColors={keyColors}
        isGameOver={isGameOver}
      />
      
      {showModal && (
        <GameOverModal 
          gameStatus={gameStatus}
          solutionWord={solutionWord}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;