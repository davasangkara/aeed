export default function Popup({ score, restartGame }) {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      background: "black",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1>{score >= 100 ? "🎉 Kamu Juara!" : "⏰ Waktu Habis!"}</h1>
      <p>Skor: {score}</p>
      <button onClick={restartGame}>Restart</button>
    </div>
  )
}
