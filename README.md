# Wordle Clone (React)

A functional clone of Wordle built with React (Vite), featuring:

- A 6x5 game grid built from reusable `GameBoard`, `Row`, and `Tile` components
- An interactive on-screen `Keyboard` synced with physical keydown events
- Input validation (A-Z only, 5-letter max, Backspace, Enter)
- Duplicate-letter-aware green/yellow/gray tile evaluation
- Win and loss conditions with a game-over modal revealing the solution

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173) in your browser.

## Build

```bash
npm run build
```

## Project structure

```
src/
  components/     # GameBoard, Row, Tile, Keyboard, GameOverModal, Toast
  utils/          # gameLogic.js - evaluation algorithm
  data/           # words.js - solution & valid-guess word lists
  App.jsx         # centralized game state + input handling
```
