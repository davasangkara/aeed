export default function StartPage({ startGame }) {
  return (
    <div style={{ textAlign: "center", paddingTop: 100 }}>
      <h1>🎉 Game Tebak-Tebakan Anak</h1>
      <p>Scan marker atau upload gambar untuk mulai!</p>
      <button style={{ background: "#ff8fab" }} onClick={startGame}>
        ▶️ Mulai Bermain
      </button>
    </div>
  )
}
