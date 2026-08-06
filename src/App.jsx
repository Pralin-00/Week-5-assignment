import { useState, useEffect, useCallback, useRef } from "react";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import GameOverModal from "./components/GameOverModal";
import Toast from "./components/Toast";
import { SOLUTION_WORDS, VALID_GUESSES } from "./data/words";
import {
  WORD_LENGTH,
  MAX_GUESSES,
  buildKeyboardStatuses,
  pickRandomSolution,
} from "./utils/gameLogic";
import "./App.css";

// A Set gives O(1) dictionary lookups when validating a submitted guess.
const VALID_GUESS_SET = new Set(VALID_GUESSES);

function App() {
  // --- Centralized game state -------------------------------------------------
  const [solutionWord, setSolutionWord] = useState(() =>
    pickRandomSolution(SOLUTION_WORDS)
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS"); // IN_PROGRESS | WON | LOST
  const [toastMessage, setToastMessage] = useState("");

  // Tracks the toast's timeout so re-triggering a message doesn't stack timers.
  const toastTimeoutRef = useRef(null);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(""), 1400);
  }, []);

  // --- Core input handler, shared by physical and virtual keyboards ----------
  const handleKeyInput = useCallback(
    (rawKey) => {
      if (gameStatus !== "IN_PROGRESS") return;

      const key = rawKey.toUpperCase();

      if (key === "BACKSPACE" || key === "DELETE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (key === "ENTER") {
        if (currentGuess.length !== WORD_LENGTH) {
          showToast("Not enough letters");
          return;
        }
        if (!VALID_GUESS_SET.has(currentGuess)) {
          showToast("Not in word list");
          return;
        }

        const nextPastGuesses = [...pastGuesses, currentGuess];
        setPastGuesses(nextPastGuesses);

        if (currentGuess === solutionWord) {
          setGameStatus("WON");
        } else if (nextPastGuesses.length >= MAX_GUESSES) {
          setGameStatus("LOST");
        }

        setCurrentGuess("");
        return;
      }

      // Only single A-Z letters are accepted, up to the 5-letter row limit.
      const isSingleLetter = /^[A-Z]$/.test(key);
      if (!isSingleLetter) return;

      setCurrentGuess((prev) =>
        prev.length < WORD_LENGTH ? prev + key : prev
      );
    },
    [gameStatus, pastGuesses, solutionWord, showToast, currentGuess]
  );

  // --- Physical keyboard listener ---------------------------------------------
  useEffect(() => {
    const handlePhysicalKeydown = (event) => {
      // Ignore modifier combinations (e.g. Cmd+R) so browser shortcuts survive.
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const { key } = event;
      if (key === "Backspace" || key === "Enter") {
        handleKeyInput(key.toUpperCase());
      } else if (/^[a-zA-Z]$/.test(key)) {
        handleKeyInput(key);
      }
    };

    window.addEventListener("keydown", handlePhysicalKeydown);
    return () => window.removeEventListener("keydown", handlePhysicalKeydown);
  }, [handleKeyInput]);

  // --- Derived state for the virtual keyboard's key colors --------------------
  const keyStatuses = buildKeyboardStatuses(pastGuesses, solutionWord);

  // --- Reset for a new round ---------------------------------------------------
  const handlePlayAgain = () => {
    setSolutionWord(pickRandomSolution(SOLUTION_WORDS));
    setCurrentGuess("");
    setPastGuesses([]);
    setGameStatus("IN_PROGRESS");
    setToastMessage("");
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>WORDLE</h1>
      </header>

      <Toast message={toastMessage} />

      <main className="app-main">
        <GameBoard
          pastGuesses={pastGuesses}
          currentGuess={currentGuess}
          solution={solutionWord}
        />
        <Keyboard
          onKeyPress={handleKeyInput}
          keyStatuses={keyStatuses}
          disabled={gameStatus !== "IN_PROGRESS"}
        />
      </main>

      <GameOverModal
        gameStatus={gameStatus}
        solution={solutionWord}
        guessCount={pastGuesses.length}
        onPlayAgain={handlePlayAgain}
      />
    </div>
  );
}

export default App;
