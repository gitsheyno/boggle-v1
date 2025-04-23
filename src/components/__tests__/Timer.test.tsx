import { render, screen, act } from "@testing-library/react";
import { vi, describe, beforeEach, expect, afterEach, it } from "vitest";
import Timer from "../Timer";

describe("Timer Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders initial time correctly", () => {
    render(<Timer initialSeconds={90} isActive={false} timeUp={vi.fn()} />);
    expect(screen.getByText("01:30")).toBeInTheDocument();
  });

  it("counts down and calls timeUp at 0", () => {
    const mockTimeUp = vi.fn();

    render(<Timer initialSeconds={3} isActive={true} timeUp={mockTimeUp} />);

    act(() => {
      vi.advanceTimersByTime(3000); // 3 seconds
    });

    expect(screen.getByText("00:00")).toBeInTheDocument();
    expect(mockTimeUp).toHaveBeenCalledOnce();
  });

  it("does not count down if isActive is false", () => {
    const mockTimeUp = vi.fn();

    render(<Timer initialSeconds={5} isActive={false} timeUp={mockTimeUp} />);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText("00:05")).toBeInTheDocument();
    expect(mockTimeUp).not.toHaveBeenCalled();
  });

  it("resets timer if initialSeconds changes", () => {
    const { rerender } = render(
      <Timer initialSeconds={60} isActive={false} timeUp={vi.fn()} />
    );

    expect(screen.getByText("01:00")).toBeInTheDocument();

    rerender(<Timer initialSeconds={45} isActive={false} timeUp={vi.fn()} />);
    expect(screen.getByText("00:45")).toBeInTheDocument();
  });

  it("displays correct progress bar color", () => {
    const { container, rerender } = render(
      <Timer initialSeconds={100} isActive={false} timeUp={vi.fn()} />
    );

    rerender(<Timer initialSeconds={100} isActive={false} timeUp={vi.fn()} />);
    expect(container.querySelector("div.bg-emerald-500")).toBeTruthy();

    rerender(<Timer initialSeconds={100} isActive={false} timeUp={vi.fn()} />);
    act(() => {
      vi.advanceTimersByTime(60000); // move 60s
    });

    rerender(<Timer initialSeconds={100} isActive={true} timeUp={vi.fn()} />);
    // Should transition to amber or red depending on time left
  });
});
