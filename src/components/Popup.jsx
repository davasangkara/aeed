export default function Popup({ score, restartGame }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white">

      {score >= 100 ? (
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          🎉 Selamat! Kamu Juara Matematika!
        </h1>
      ) : (
        <h1 className="text-3xl mb-4">⏰ Waktu Habis!</h1>
      )}

      <p className="text-xl mb-6">Skor Akhir: {score}</p>

      <button
        onClick={restartGame}
        className="bg-green-500 px-6 py-3 rounded-lg text-lg hover:bg-green-600"
      >
        Restart Game
      </button>
    </div>
  )
}
