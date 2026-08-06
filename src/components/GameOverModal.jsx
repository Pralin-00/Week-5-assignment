import "./GameOverModal.css";

/**
 * Modal shown when the game ends. On a loss it reveals the correct
 * solution word; on a win it congratulates the player.
 */
function GameOverModal({ gameStatus, solution, guessCount, onPlayAgain }) {
  if (gameStatus === "IN_PROGRESS") return null;

  const isWin = gameStatus === "WON";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isWin ? "You Won! 🎉" : "Game Over"}</h2>
        {isWin ? (
          <p>
            You guessed <strong>{solution}</strong> in {guessCount}{" "}
            {guessCount === 1 ? "try" : "tries"}.
          </p>
        ) : (
          <p>
            The word was <strong>{solution}</strong>. Better luck next time!
          </p>
        )}
        <button className="play-again-btn" onClick={onPlayAgain} type="button">
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameOverModal;
