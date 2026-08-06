// Core evaluation logic for the Wordle clone.
// Tile status values: "correct" (green), "present" (yellow), "absent" (gray)

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export const TILE_STATUS = {
  CORRECT: "correct",
  PRESENT: "present",
  ABSENT: "absent",
  EMPTY: "empty",
};

/**
 * Evaluates a single guess against the solution word using the classic
 * two-pass Wordle algorithm so duplicate letters are scored correctly.
 *
 * Pass 1: mark every exact positional match as CORRECT and consume that
 * letter from the pool of remaining solution letters.
 * Pass 2: for letters not already marked, mark PRESENT if the letter is
 * still available in the remaining pool (and consume it), otherwise ABSENT.
 *
 * @param {string} guess - the 5-letter guess, uppercase
 * @param {string} solution - the 5-letter solution word, uppercase
 * @returns {string[]} array of TILE_STATUS values, one per letter position
 */
export function evaluateGuess(guess, solution) {
  const guessLetters = guess.split("");
  const solutionLetters = solution.split("");
  const result = new Array(WORD_LENGTH).fill(TILE_STATUS.ABSENT);

  // Pool of letters in the solution not yet claimed by a green match.
  const letterPool = {};
  for (const letter of solutionLetters) {
    letterPool[letter] = (letterPool[letter] || 0) + 1;
  }

  // Pass 1: greens
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessLetters[i] === solutionLetters[i]) {
      result[i] = TILE_STATUS.CORRECT;
      letterPool[guessLetters[i]] -= 1;
    }
  }

  // Pass 2: yellows / grays
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === TILE_STATUS.CORRECT) continue;
    const letter = guessLetters[i];
    if (letterPool[letter] > 0) {
      result[i] = TILE_STATUS.PRESENT;
      letterPool[letter] -= 1;
    } else {
      result[i] = TILE_STATUS.ABSENT;
    }
  }

  return result;
}

// Priority used when merging statuses on the virtual keyboard, since a
// letter's key color should reflect its *best* known status across guesses.
const STATUS_PRIORITY = {
  [TILE_STATUS.CORRECT]: 3,
  [TILE_STATUS.PRESENT]: 2,
  [TILE_STATUS.ABSENT]: 1,
};

/**
 * Builds a map of letter -> best-known status across all past guesses,
 * used to color the on-screen keyboard keys.
 */
export function buildKeyboardStatuses(pastGuesses, solution) {
  const statuses = {};
  for (const guess of pastGuesses) {
    const evaluation = evaluateGuess(guess, solution);
    guess.split("").forEach((letter, i) => {
      const status = evaluation[i];
      const currentBest = statuses[letter];
      if (!currentBest || STATUS_PRIORITY[status] > STATUS_PRIORITY[currentBest]) {
        statuses[letter] = status;
      }
    });
  }
  return statuses;
}

export function pickRandomSolution(wordList) {
  const index = Math.floor(Math.random() * wordList.length);
  return wordList[index];
}
