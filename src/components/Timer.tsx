import React, { useEffect, useState } from "react";

interface TimerProps {
  initialSeconds: number;
  isActive: boolean;
  timeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds, isActive, timeUp }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    // Reset timer when initialSeconds changes
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && seconds > 0) {
      interval = window.setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            timeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds, timeUp]);

  // Format time as mm:ss
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate percentage for progress bar
  const progressPercentage = (seconds / initialSeconds) * 100;

  // Determine color based on time remaining
  const getProgressColor = (): string => {
    if (progressPercentage > 50) return "bg-emerald-500";
    if (progressPercentage > 25) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-slate-600">
          Time Remaining
        </span>
        <span className="text-xl font-bold text-slate-800">
          {formatTime(seconds)}
        </span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${getProgressColor()}`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
