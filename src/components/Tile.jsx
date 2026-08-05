import React from 'react';

const Tile = ({ value, status }) => {
  const getClassName = () => {
    const baseClass = 'tile';
    switch(status) {
      case 'correct':
        return `${baseClass} tile-correct`;
      case 'present':
        return `${baseClass} tile-present`;
      case 'absent':
        return `${baseClass} tile-absent`;
      case 'filled':
        return `${baseClass} tile-filled`;
      default:
        return baseClass;
    }
  };
  
  return (
    <div className={getClassName()}>
      {value}
    </div>
  );
};

export default Tile;