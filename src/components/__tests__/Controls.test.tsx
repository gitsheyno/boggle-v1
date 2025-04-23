import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Controls from "../../components/Controls";

describe("Controls", () => {
  const defaultProps = {
    gameActive: false,
    onStart: vi.fn(),
    onReset: vi.fn(),
    timerSeconds: 120,
    onTimerChange: vi.fn(),
    onTimeUp: vi.fn(),
    initialSeconds: 120,
  };

  it("renders Start Game when game is not active", () => {
    render(<Controls {...defaultProps} />);
    expect(screen.getByText(/start game/i)).toBeInTheDocument();
  });

  it("calls onStart when Start Game is clicked", () => {
    render(<Controls {...defaultProps} />);
    fireEvent.click(screen.getByText(/start game/i));
    expect(defaultProps.onStart).toHaveBeenCalled();
  });

  it("renders End Game when game is active", () => {
    render(<Controls {...defaultProps} gameActive={true} />);
    expect(screen.getByText(/end game/i)).toBeInTheDocument();
  });

  it("calls onReset when End Game is clicked", () => {
    render(<Controls {...defaultProps} gameActive={true} />);
    fireEvent.click(screen.getByText(/end game/i));
    expect(defaultProps.onReset).toHaveBeenCalled();
  });

  it("renders timer options and highlights selected one", () => {
    render(<Controls {...defaultProps} />);
    const selected = screen.getByText("2 min");
    expect(selected).toHaveClass("bg-indigo-100");
  });

  it("calls onTimerChange when a timer option is clicked", () => {
    render(<Controls {...defaultProps} />);
    fireEvent.click(screen.getByText("3 min"));
    expect(defaultProps.onTimerChange).toHaveBeenCalledWith(180);
  });

  it("renders Timer when game is active", () => {
    render(<Controls {...defaultProps} gameActive={true} />);
    expect(screen.queryByText(/game length/i)).not.toBeInTheDocument(); // options hidden
    // optionally check for Timer elements if you mock the Timer component
  });
});
