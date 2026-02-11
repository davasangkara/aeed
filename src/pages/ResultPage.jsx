export default function ResultPage({ score, restart }) {

  if (score >= 20) {
    window.confetti()
  }

  return (
    <div style={{ textAlign: "center", paddingTop: 100 }}>
      <h1>🎊 Permainan Selesai!</h1>
      <h2>Skor Kamu: {score}</h2>

      {score >= 20 && <h3>🎉 Kamu Hebat!</h3>}

      <button style={{ background: "#caffbf" }} onClick={restart}>
        🔄 Main Lagi
      </button>
    </div>
  )
}
