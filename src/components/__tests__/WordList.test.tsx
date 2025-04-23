import { render, screen } from "@testing-library/react";
import WordList from "../WordList";
import { it, expect, describe } from "vitest";

describe("WordList", () => {
  it("displays total score and word count correctly", () => {
    render(<WordList words={["hello", "apple"]} totalScore={4} />);
    expect(screen.getByText("4 pts")).toBeInTheDocument();
    expect(screen.getByText("Total Words: 2")).toBeInTheDocument();
    expect(screen.getByText("Avg Points: 2.0 per word")).toBeInTheDocument();
  });

  it("shows correct score for each word", () => {
    render(
      <WordList words={["hi", "tree", "bottle", "elephant"]} totalScore={15} />
    );

    expect(screen.getByText("tree")).toBeInTheDocument();
    expect(screen.getByText("+1")).toBeInTheDocument(); // tree = 1 point
    expect(screen.getByText("+3")).toBeInTheDocument(); // bottle = 3
    expect(screen.getByText("+11")).toBeInTheDocument(); // elephant = 11
  });

  it("sorts words by score descending", () => {
    const { container } = render(
      <WordList
        words={["hi", "dog", "apple", "grapes", "elephant"]}
        totalScore={15}
      />
    );

    const rows = container.querySelectorAll("tbody tr");
    expect(rows[0]).toHaveTextContent("elephant"); // 11
    expect(rows[1]).toHaveTextContent("grapes"); // 3
    expect(rows[2]).toHaveTextContent("apple"); // 2
    expect(rows[3]).toHaveTextContent("dog"); // 1
    expect(rows[4]).toHaveTextContent("hi"); // 0
  });

  it("displays badge for 7-letter and 8+ letter words", () => {
    render(<WordList words={["bottles", "elephant", "cat"]} totalScore={13} />);

    expect(screen.getByText("bottles")).toBeInTheDocument();
    expect(screen.getByText("Good!")).toBeInTheDocument();

    expect(screen.getByText("elephant")).toBeInTheDocument();
    expect(screen.getByText("Great!")).toBeInTheDocument();
  });

  it("renders empty state when no words are found", () => {
    render(<WordList words={[]} totalScore={0} />);
    expect(screen.getByText("No words found yet...")).toBeInTheDocument();
  });
});
