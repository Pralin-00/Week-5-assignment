import Tile from "./Tile";
import { WORD_LENGTH, TILE_STATUS, evaluateGuess } from "../utils/gameLogic";
import "./Row.css";

/**
 * Renders one row of the board. Handles three cases:
 *  - a completed guess (statuses computed against the solution)
 *  - the row currently being typed
 *  - a future, still-empty row
 */
function Row({ guess, solution, isSubmitted, isCurrent }) {
  const letters = guess.padEnd(WORD_LENGTH, " ").split("");
  const statuses = isSubmitted
    ? evaluateGuess(guess, solution)
    : new Array(WORD_LENGTH).fill(TILE_STATUS.EMPTY);

  const rowClass = isCurrent ? "row current-row" : "row";

  return (
    <div className={rowClass}>
      {letters.map((letter, i) => (
        <Tile key={i} letter={letter.trim()} status={statuses[i]} />
      ))}
    </div>
  );
}

export default Row;
