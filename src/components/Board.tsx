import React, { useState, useEffect } from "react";
import Die from "./Die";
import { isValidPath, getWordFromPath } from "../utils/boardUtils";
import { GAME_SETTINGS } from "../constans/gameConstans";

interface BoardProps {
  board: string[][];
  onWordFound: (word: string) => void;
  gameActive: boolean;
}

const Board: React.FC<BoardProps> = ({ board, onWordFound, gameActive }) => {
  const [selectedPath, setSelectedPath] = useState<[number, number][]>([]);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [currentWord, setCurrentWord] = useState<string>("");

  // Reset selection when game is not active
  useEffect(() => {
    if (!gameActive) {
      setSelectedPath([]);
      setIsSelecting(false);
      setCurrentWord("");
    }
  }, [gameActive]);

  // Update current word when path changes
  useEffect(() => {
    if (selectedPath.length > 0) {
      const word = getWordFromPath(board, selectedPath);
      setCurrentWord(word);
    } else {
      setCurrentWord("");
    }
  }, [selectedPath, board]);

  const handleDieMouseDown = (row: number, col: number) => {
    if (!gameActive) return;
    setIsSelecting(true);
    setSelectedPath([[row, col]]);
  };

  const handleDieMouseEnter = (row: number, col: number) => {
    if (!isSelecting || !gameActive) return;
    // Check if this position is adjacent to the last one in the path
    if (selectedPath.length > 0) {
      const lastPos = selectedPath[selectedPath.length - 1];
      const rowDiff = Math.abs(lastPos[0] - row);
      const colDiff = Math.abs(lastPos[1] - col);
      // Check if the position is already in the path
      const isAlreadySelected = selectedPath.some(
        ([r, c]) => r === row && c === col
      );
      // Only add if it's adjacent and not already in the path
      if (
        rowDiff <= 1 &&
        colDiff <= 1 &&
        (rowDiff > 0 || colDiff > 0) &&
        !isAlreadySelected
      ) {
        setSelectedPath([...selectedPath, [row, col]]);
      }
      // If it's already in the path and it's the second-to-last position,
      // allow backtracking by removing the last position
      if (isAlreadySelected && selectedPath.length > 1) {
        const secondToLastPos = selectedPath[selectedPath.length - 2];
        if (secondToLastPos[0] === row && secondToLastPos[1] === col) {
          setSelectedPath(selectedPath.slice(0, -1));
        }
      }
    }
  };

  const handleMouseUp = () => {
    if (!isSelecting || !gameActive) return;
    setIsSelecting(false);
    // Validate the path and submit the word if valid
    if (isValidPath(selectedPath)) {
      const word = getWordFromPath(board, selectedPath);
      if (word.length >= GAME_SETTINGS.MIN_WORD_LENGTH) {
        onWordFound(word);
      }
    }
    // Reset the path
    setSelectedPath([]);
  };

  // Determine if a die can be selected (adjacent to the last selected die)
  const isDieSelectable = (row: number, col: number): boolean => {
    if (!isSelecting || selectedPath.length === 0) return gameActive;
    const lastPos = selectedPath[selectedPath.length - 1];
    const rowDiff = Math.abs(lastPos[0] - row);
    const colDiff = Math.abs(lastPos[1] - col);
    // Adjacent but not the same position
    return (
      gameActive && rowDiff <= 1 && colDiff <= 1 && (rowDiff > 0 || colDiff > 0)
    );
  };

  // Check if a die is in the selected path
  const isDieSelected = (row: number, col: number): boolean => {
    return selectedPath.some(([r, c]) => r === row && c === col);
  };

  // Get index in the path for showing selection order
  const getSelectionIndex = (row: number, col: number): number | null => {
    for (let i = 0; i < selectedPath.length; i++) {
      if (selectedPath[i][0] === row && selectedPath[i][1] === col) {
        return i + 1;
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="h-10 flex items-center justify-center">
        {currentWord ? (
          <div className="bg-indigo-100 px-4 py-2 rounded-full text-indigo-800 font-medium text-lg animate-pulse">
            {currentWord}
          </div>
        ) : (
          <div className="h-10"></div>
        )}
      </div>
      <div
        className="relative bg-gradient-to-br from-amber-100 to-amber-50 p-6 rounded-2xl shadow-xl border-4 border-amber-200"
        style={{ touchAction: "none" }}
        onMouseLeave={handleMouseUp}
      >
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {board.map((row, rowIndex) =>
            row.map((letter, colIndex) => (
              <Die
                key={`${rowIndex}-${colIndex}`}
                letter={letter}
                row={rowIndex}
                col={colIndex}
                isSelected={isDieSelected(rowIndex, colIndex)}
                isSelectable={isDieSelectable(rowIndex, colIndex)}
                selectionIndex={getSelectionIndex(rowIndex, colIndex)}
                onMouseDown={handleDieMouseDown}
                onMouseEnter={handleDieMouseEnter}
                onMouseUp={handleMouseUp}
              />
            ))
          )}
        </div>
        {!gameActive && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="text-white text-xl font-bold">
              {gameActive ? "" : "Press Start to Play"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
