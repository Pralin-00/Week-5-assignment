import "./Tile.css";

/**
 * A single letter tile within the game grid.
 * status controls the CSS class applied (empty | filled | correct | present | absent)
 */
function Tile({ letter, status }) {
  const hasLetter = letter && letter.length > 0;
  const stateClass = status === "empty" && hasLetter ? "filled" : status;

  return (
    <div className={`tile ${stateClass}`}>
      {letter}
    </div>
  );
}

export default Tile;
