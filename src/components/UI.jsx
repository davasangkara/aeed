export default function UI({
  question,
  options,
  score,
  timeLeft,
  checkAnswer,
  setLevel
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white p-4">

      <h1 className="text-3xl font-bold mb-3">🧠 AR Math Game</h1>

      <div className="flex gap-3 mb-3">
        <button onClick={() => setLevel("easy")} className="btn-level">Easy</button>
        <button onClick={() => setLevel("medium")} className="btn-level">Medium</button>
        <button onClick={() => setLevel("hard")} className="btn-level">Hard</button>
      </div>

      <div className="text-xl mb-2">⏳ {timeLeft}s</div>
      <div className="text-xl mb-4">⭐ Skor: {score}</div>

      <div className="bg-white text-black p-6 rounded-xl text-2xl font-bold mb-4 shadow-lg">
        {question}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => checkAnswer(opt)}
            className="bg-blue-500 hover:bg-blue-600 p-3 rounded-lg text-xl transition"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
