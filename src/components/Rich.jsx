/** Renders `**bold**` segments of a data string as <strong>. */
function Rich({ text }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? <strong key={i}>{part}</strong> : part
  );
}

export default Rich;
