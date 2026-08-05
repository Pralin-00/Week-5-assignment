import React from 'react';

const Keyboard = ({ onKeyPress, keyColors, isGameOver }) => {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];
  
  const getKeyClass = (key) => {
    const color = keyColors[key];
    if (!color) return 'key';
    if (key === 'ENTER' || key === 'BACKSPACE') return 'key';
    return `key key-${color}`;
  };
  
  const getKeyLabel = (key) => {
    if (key === 'BACKSPACE') return '⌫';
    if (key === 'ENTER') return '↵';
    return key;
  };
  
  const getKeyWidth = (key) => {
    if (key === 'ENTER' || key === 'BACKSPACE') return 'key-wide';
    return '';
  };
  
  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={`${getKeyClass(key)} ${getKeyWidth(key)}`}
              onClick={() => !isGameOver && onKeyPress(key)}
              disabled={isGameOver}
            >
              {getKeyLabel(key)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;