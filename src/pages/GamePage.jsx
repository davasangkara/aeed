import { useState } from "react"
import { riddles } from "../data/riddles"

export default function GamePage({ finishGame }) {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)

  const handleAnswer = (option) => {
    if (option === riddles[current].answer) {
      new Audio("/correct.mp3").play()
      setScore(score + 10)
    } else {
      new Audio("/wrong.mp3").play()
    }

    if (current + 1 < riddles.length) {
      setTimeout(() => setCurrent(current + 1), 1000)
    } else {
      setTimeout(() => finishGame(score + 10), 1000)
    }
  }

  return (
    <div style={{ textAlign: "center", paddingTop: 50 }}>
      <h2>Soal {current + 1} / {riddles.length}</h2>
      <h3>{riddles[current].question}</h3>

      <div>
        {riddles[current].options.map((opt, i) => (
          <button
            key={i}
            style={{ background: "#a2d2ff" }}
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        ⭐ Skor: {score}
      </div>
    </div>
  )
}
