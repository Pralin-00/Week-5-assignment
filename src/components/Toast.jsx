import "./Toast.css";

/** Small transient banner used for input validation messages. */
function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast" role="status">
      {message}
    </div>
  );
}

export default Toast;
