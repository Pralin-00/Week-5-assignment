import Row from "./Row";
import { MAX_GUESSES } from "../utils/gameLogic";
import "./GameBoard.css";

/**
 * Renders the structural 6-row x 5-tile game grid.
 * pastGuesses: array of completed guess strings
 * currentGuess: the string currently being typed (row after the past guesses)
 * solution: the hidden target word, needed to color completed rows
 */
function GameBoard({ pastGuesses, currentGuess, solution }) {
  const rows = [];

  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < pastGuesses.length) {
      // A completed, submitted guess
      rows.push(
        <Row key={i} guess={pastGuesses[i]} solution={solution} isSubmitted />
      );
    } else if (i === pastGuesses.length) {
      // The row currently being typed
      rows.push(
        <Row key={i} guess={currentGuess} solution={solution} isCurrent />
      );
    } else {
      // An empty, future row
      rows.push(<Row key={i} guess="" solution={solution} />);
    }
  }

  return <div className="game-board">{rows}</div>;
}

export default GameBoard;
