import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import Board from "../../components/Board";
import WordList from "../../components/WordList";
import Controls from "../../components/Controls";
import GameStats from "../../components/GameStats";

describe("Component Render Tests", () => {
  // Test for App component
  it("renders App component", () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  // Test for Board component
  it("renders Board component", () => {
    const mockBoard = [
      ["A", "B", "C", "D"],
      ["E", "F", "G", "H"],
      ["I", "J", "K", "L"],
      ["M", "N", "O", "P"],
    ];

    const handleWordFound = () => {};
    const { container } = render(
      <Board
        board={mockBoard}
        onWordFound={handleWordFound}
        gameActive={true}
      />
    );

    expect(container).toBeInTheDocument();
  });

  // Test for WordList component
  it("renders WordList component", () => {
    const words = ["CAT", "DOG", "ELEPHANT"];
    const totalScore = 14;

    const { container } = render(
      <WordList words={words} totalScore={totalScore} />
    );

    expect(container).toBeInTheDocument();
  });

  // Test for Controls component
  it("renders Controls component", () => {
    const handleStart = () => {};
    const handleReset = () => {};
    const handleTimerChange = () => {};
    const handleTimeUp = () => {};

    const { container } = render(
      <Controls
        gameActive={false}
        onStart={handleStart}
        onReset={handleReset}
        timerSeconds={180}
        onTimerChange={handleTimerChange}
        onTimeUp={handleTimeUp}
        initialSeconds={180}
      />
    );

    expect(container).toBeInTheDocument();
  });

  // Test for GameStats component
  it("renders GameStats component", () => {
    const words = ["CAT", "DOG", "ELEPHANT"];
    const score = 14;

    const { container } = render(<GameStats words={words} score={score} />);

    expect(container).toBeInTheDocument();
  });
});
