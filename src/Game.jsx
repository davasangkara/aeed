import { useEffect, useState, useRef } from "react"
import UI from "./components/UI"
import Popup from "./components/Popup"

export default function Game() {
  const [markerVisible, setMarkerVisible] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [level, setLevel] = useState("easy")
  const [useImageSource, setUseImageSource] = useState(false)
  const imageRef = useRef(null)

  const correctSound = new Audio("/correct.mp3")
  const wrongSound = new Audio("/wrong.mp3")

  const generateNumber = () => {
    if (level === "easy") return Math.floor(Math.random() * 9) + 1
    if (level === "medium") return Math.floor(Math.random() * 90) + 10
    return Math.floor(Math.random() * 900) + 100
  }

  const generateQuestion = () => {
    const ops = ["+", "-", "*", "/"]
    const op = ops[Math.floor(Math.random() * ops.length)]
    let n1 = generateNumber()
    let n2 = generateNumber()
    if (op === "/") n1 = n1 * n2

    const answer = Math.floor(eval(`${n1} ${op} ${n2}`))

    const choices = [
      answer,
      answer + 2,
      answer - 3,
      answer + 5
    ].sort(() => Math.random() - 0.5)

    setQuestion(`${n1} ${op} ${n2}`)
    setOptions(choices)
  }

  useEffect(() => {
    generateQuestion()
  }, [level])

  useEffect(() => {
    const marker = document.querySelector("a-marker")
    if (marker) {
      marker.addEventListener("markerFound", () => setMarkerVisible(true))
      marker.addEventListener("markerLost", () => setMarkerVisible(false))
    }
  }, [])

  useEffect(() => {
    if (!markerVisible || gameOver) return
    if (timeLeft <= 0) {
      setGameOver(true)
      return
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, markerVisible, gameOver])

  useEffect(() => {
    if (score >= 100) {
      window.confetti()
      setGameOver(true)
    }
  }, [score])

  const checkAnswer = (val) => {
    const correct = Math.floor(eval(question))
    if (val === correct) {
      correctSound.play()
      setScore(s => Math.min(s + 10, 100))
    } else {
      wrongSound.play()
      setScore(s => Math.max(s - 5, 0))
    }
    generateQuestion()
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      imageRef.current.src = reader.result
      setUseImageSource(true)
    }
    reader.readAsDataURL(file)
  }

  const restartGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameOver(false)
    generateQuestion()
  }

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>

      {/* Upload Mode */}
      <div style={{ position: "absolute", zIndex: 10, top: 10, left: 10 }}>
        <button onClick={() => setUseImageSource(false)}>📷 Camera</button>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        arjs={`sourceType: ${useImageSource ? "image" : "webcam"};`}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {useImageSource && (
          <img ref={imageRef} alt="uploaded" />
        )}

        <a-marker preset="hiro">
          <a-box position="0 1 0" color="red"></a-box>
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>

      {markerVisible && !gameOver && (
        <UI
          question={question}
          options={options}
          score={score}
          timeLeft={timeLeft}
          checkAnswer={checkAnswer}
          setLevel={setLevel}
        />
      )}

      {gameOver && (
        <Popup score={score} restartGame={restartGame} />
      )}
    </div>
  )
}
