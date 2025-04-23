import { render, screen, fireEvent } from "@testing-library/react";
import Die from "../Die";
import { describe, it, expect, vi } from "vitest";

describe("Die", () => {
  const defaultProps = {
    letter: "A",
    row: 0,
    col: 0,
    isSelected: false,
    isSelectable: true,
    selectionIndex: null,
    onMouseDown: vi.fn(),
    onMouseEnter: vi.fn(),
    onMouseUp: vi.fn(),
  };

  it("renders the letter", () => {
    render(<Die {...defaultProps} />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it('renders "Qu" with special styling', () => {
    render(<Die {...defaultProps} letter="Qu" />);
    expect(screen.getByText("Qu")).toBeInTheDocument();
  });

  it("calls onMouseDown with correct row and col", () => {
    render(<Die {...defaultProps} />);
    fireEvent.mouseDown(screen.getByText("A"));
    expect(defaultProps.onMouseDown).toHaveBeenCalledWith(0, 0);
  });

  it("calls onMouseEnter with correct row and col", () => {
    render(<Die {...defaultProps} />);
    fireEvent.mouseEnter(screen.getByText("A"));
    expect(defaultProps.onMouseEnter).toHaveBeenCalledWith(0, 0);
  });

  it("calls onMouseUp when released", () => {
    render(<Die {...defaultProps} />);
    fireEvent.mouseUp(screen.getByText("A"));
    expect(defaultProps.onMouseUp).toHaveBeenCalled();
  });

  it("adds selection class and badge when selected", () => {
    render(
      <Die {...defaultProps} isSelected={true} selectionIndex={2} letter="B" />
    );
    expect(screen.getByText("2")).toBeInTheDocument();
    const die = screen.getByText("B").closest("div");
    expect(die).toHaveClass("ring-2");
    expect(die).toHaveClass("text-white");
  });

  it("does not show badge if selected but index is null", () => {
    render(<Die {...defaultProps} isSelected={true} selectionIndex={null} />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("has hover effect if selectable and not selected", () => {
    render(
      <Die
        {...defaultProps}
        isSelected={false}
        isSelectable={true}
        letter="D"
      />
    );
    const die = screen.getByText("D").closest("div");
    expect(die).toHaveClass("hover:bg-amber-200");
  });

  it("has reduced opacity if not selectable and not selected", () => {
    render(
      <Die
        {...defaultProps}
        isSelected={false}
        isSelectable={false}
        letter="E"
      />
    );
    const die = screen.getByText("E").closest("div");
    expect(die).toHaveClass("opacity-90");
  });
});
