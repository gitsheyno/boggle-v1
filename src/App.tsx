import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import WordList from "./components/WordList";
import Controls from "./components/Controls";
import GameStats from "./components/GameStats";
// import GameInstructions from "./components/GameInstructions";
import { generateBoard } from "./utils/boardUtils";
import { calculateWordListScore } from "./utils/scoring";
import { GAME_SETTINGS } from "./constans/gameConstans";

function App() {
  const [board, setBoard] = useState<string[][]>(generateBoard());
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(
    GAME_SETTINGS.DEFAULT_TIMER
  );
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Initialize a fresh game
  const initializeGame = () => {
    setBoard(generateBoard());
    setFoundWords([]);
    setScore(0);
    setGameActive(false);
    setGameOver(false);
  };

  // Start the game
  const startGame = () => {
    setGameActive(true);
    setGameOver(false);
  };

  // End the game
  const endGame = () => {
    setGameActive(false);
    setGameOver(true);
  };

  // Reset the game
  const resetGame = () => {
    endGame();
    initializeGame();
  };

  // Handle word submission
  const handleWordFound = (word: string) => {
    if (!gameActive) return;

    // Convert to lowercase for comparison
    const lowerWord = word.toLowerCase();

    // Check if the word is already found
    if (foundWords.some((w) => w.toLowerCase() === lowerWord)) {
      // Word already found, don't add it again
      return;
    }

    // Add the word to the list of found words
    setFoundWords((prev) => [...prev, word]);
  };

  // // Update score when words change
  useEffect(() => {
    const newScore = calculateWordListScore(foundWords);
    setScore(newScore);
  }, [foundWords]);

  return (
    <div className="min-h-screen h-[100vh]  bg-gradient-to-b from-indigo-50 to-slate-100 text-slate-900">
      <main className="container  mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          {/* Game controls */}
          <Controls
            gameActive={gameActive}
            onStart={startGame}
            onReset={resetGame}
            timerSeconds={timerSeconds}
            onTimerChange={setTimerSeconds}
            onTimeUp={endGame}
            initialSeconds={timerSeconds}
          />

          <div className="flex items-end   gap-8 w-full max-w-4xl">
            {/* Game board */}
            <div className="flex justify-center flex-1">
              <Board
                board={board}
                onWordFound={handleWordFound}
                gameActive={gameActive}
              />
            </div>

            {/* Word list */}
            {!gameOver ? (
              <div className="flex justify-center flex-1 h-[420px]">
                <WordList words={foundWords} totalScore={score} />
              </div>
            ) : (
              <div className="mt-6 w-full max-w-lg flex-1 ">
                <div className="bg-white h-[420px] rounded-2xl shadow-xl p-6 border border-indigo-100">
                  <GameStats words={foundWords} score={score} />
                  <div className="mt-6 flex flex-col justify-center gap-3">
                    <button
                      onClick={resetGame}
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md"
                    >
                      Play Again
                    </button>
                    <h2 className="text-2xl font-bold text-center text-red-500">
                      Game Over!
                    </h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
