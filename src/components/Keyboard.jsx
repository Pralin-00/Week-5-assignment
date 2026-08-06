import "./Keyboard.css";

const ROW_1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const ROW_2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const ROW_3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"];

/**
 * Interactive on-screen keyboard. Clicking a key fires the same handler
 * used for physical keydown events, and each letter key is colored using
 * the merged status map computed from past guesses.
 */
function Keyboard({ onKeyPress, keyStatuses, disabled }) {
  const renderKey = (key) => {
    const isSpecial = key === "ENTER" || key === "BACKSPACE";
    const status = keyStatuses[key];
    const classes = ["key"];
    if (isSpecial) classes.push("key-wide");
    if (status) classes.push(status);

    return (
      <button
        key={key}
        className={classes.join(" ")}
        onClick={() => onKeyPress(key)}
        disabled={disabled}
        type="button"
        aria-label={key}
      >
        {key === "BACKSPACE" ? "⌫" : key}
      </button>
    );
  };

  return (
    <div className="keyboard">
      <div className="keyboard-row">{ROW_1.map(renderKey)}</div>
      <div className="keyboard-row">{ROW_2.map(renderKey)}</div>
      <div className="keyboard-row">{ROW_3.map(renderKey)}</div>
    </div>
  );
}

export default Keyboard;
