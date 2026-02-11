import { useEffect, useState } from "react";
import UI from "./components/UI";
import Popup from "./components/Popup";

import correctSoundFile from "./assets/correct.mp3";
import wrongSoundFile from "./assets/wrong.mp3";

export default function Game() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [level, setLevel] = useState("easy");
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [markerVisible, setMarkerVisible] = useState(false);

  const correctSound = new Audio(correctSoundFile);
  const wrongSound = new Audio(wrongSoundFile);

  const generateNumber = () => {
    if (level === "easy") return Math.floor(Math.random() * 9) + 1;
    if (level === "medium") return Math.floor(Math.random() * 90) + 10;
    return Math.floor(Math.random() * 900) + 100;
  };

  const generateQuestion = () => {
    const ops = ["+", "-", "*", "/"];
    const op = ops[Math.floor(Math.random() * ops.length)];

    let num1 = generateNumber();
    let num2 = generateNumber();

    if (op === "/") {
      num1 = num1 * num2;
    }

    const answer = Math.floor(eval(`${num1} ${op} ${num2}`));

    const choices = [
      answer,
      answer + Math.floor(Math.random() * 5) + 1,
      answer - Math.floor(Math.random() * 5) - 1,
      answer + Math.floor(Math.random() * 3) + 2,
    ].sort(() => Math.random() - 0.5);

    setQuestion(`${num1} ${op} ${num2}`);
    setOptions(choices);
  };

  const checkAnswer = (selected) => {
    const correct = Math.floor(eval(question));

    if (selected === correct) {
      correctSound.play();
      setScore((prev) => Math.min(prev + 10, 100));
    } else {
      wrongSound.play();
      setScore((prev) => Math.max(prev - 5, 0));
    }

    generateQuestion();
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    generateQuestion();
  };

  useEffect(() => {
    generateQuestion();
  }, [level]);

  useEffect(() => {
    if (!markerVisible || gameOver) return;

    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, markerVisible, gameOver]);

  useEffect(() => {
    if (score >= 100) {
      window.confetti();
      setGameOver(true);
    }
  }, [score]);

  return (
    <div className="w-full h-screen relative">
      <a-scene
        embedded
        arjs="sourceType: webcam;"
        renderer="logarithmicDepthBuffer: true;"
      >
        <a-marker
          preset="hiro"
          onMarkerFound={() => setMarkerVisible(true)}
          onMarkerLost={() => setMarkerVisible(false)}
        >
          <a-box position="0 0.5 0" color="#4CAF50"></a-box>
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

      {gameOver && <Popup score={score} restartGame={restartGame} />}
    </div>
  );
}
