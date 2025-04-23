import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GameStats from "../../components/GameStats";

describe("GameStats", () => {
  it("renders total score", () => {
    render(<GameStats words={[]} score={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText(/total score/i)).toBeInTheDocument();
  });

  it("renders number of words found", () => {
    render(<GameStats words={["apple", "banana", "cat"]} score={10} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText(/words found/i)).toBeInTheDocument();
  });

  it("displays the longest word with its length", () => {
    render(<GameStats words={["hi", "elephant", "tree"]} score={0} />);
    expect(screen.getByText(/longest word/i)).toBeInTheDocument();
    expect(screen.getByText("elephant")).toBeInTheDocument();
    expect(screen.getByText("(8)")).toBeInTheDocument();
  });

  it("does not render longest word section if no words", () => {
    render(<GameStats words={[]} score={0} />);
    expect(screen.queryByText(/longest word/i)).not.toBeInTheDocument();
  });
});
