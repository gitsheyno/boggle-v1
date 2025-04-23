import React from "react";
import Timer from "./Timer";

interface ControlsProps {
  gameActive: boolean;
  onStart: () => void;
  onReset: () => void;
  timerSeconds: number;
  onTimeUp: () => void;
  initialSeconds: number;
  onTimerChange: (seconds: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
  gameActive,
  onStart,
  onReset,
  timerSeconds,
  onTimerChange,
  onTimeUp,
}) => {
  const timerOptions = [
    { label: "1 min", value: 60 },
    { label: "2 min", value: 120 },
    { label: "3 min", value: 180 },
    { label: "5 min", value: 300 },
  ];

  return (
    <div className="w-full max-w-2xl flex flex-col md:flex-row items-center gap-4 p-5 bg-white rounded-2xl shadow-lg border border-slate-100">
      <div className="w-full md:w-auto">
        {!gameActive ? (
          <button
            onClick={onStart}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Start Game
          </button>
        ) : (
          <button
            onClick={onReset}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            End Game
          </button>
        )}
      </div>
      {!gameActive ? (
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="text-sm font-medium text-slate-600 self-center">
            Game Length:
          </span>
          <div className="flex gap-1">
            {timerOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onTimerChange(option.value)}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  timerSeconds === option.value
                    ? "bg-indigo-100 text-indigo-800 font-medium shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <Timer
          initialSeconds={timerSeconds}
          isActive={gameActive}
          timeUp={onTimeUp}
        />
      )}
    </div>
  );
};

export default Controls;
