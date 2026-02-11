export default function UI({
  question,
  options,
  score,
  timeLeft,
  checkAnswer,
  setLevel
}) {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1>🧠 AR Math Game</h1>
      <div>⏳ {timeLeft}s</div>
      <div>⭐ {score}</div>
      <div style={{ fontSize: 24, margin: 10 }}>{question}</div>
      <div>
        {options.map((o, i) => (
          <button key={i} onClick={() => checkAnswer(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
