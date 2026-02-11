import { useState } from "react"
import StartPage from "./pages/StartPage"
import GamePage from "./pages/GamePage"
import ResultPage from "./pages/ResultPage"

export default function App() {
  const [page, setPage] = useState("start")
  const [score, setScore] = useState(0)

  return (
    <>
      {page === "start" && (
        <StartPage startGame={() => setPage("game")} />
      )}

      {page === "game" && (
        <GamePage
          finishGame={(finalScore) => {
            setScore(finalScore)
            setPage("result")
          }}
        />
      )}

      {page === "result" && (
        <ResultPage score={score} restart={() => setPage("start")} />
      )}
    </>
  )
}
