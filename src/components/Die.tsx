import React from "react";

interface DieProps {
  letter: string;
  row: number;
  col: number;
  isSelected: boolean;
  isSelectable: boolean;
  selectionIndex: number | null;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const Die: React.FC<DieProps> = ({
  letter,
  row,
  col,
  isSelected,
  isSelectable,
  selectionIndex,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  // Special styling for 'Qu' to make it fit
  const isQu = letter === "Qu";

  // Get gradient colors based on selection status
  const getBackgroundStyle = () => {
    if (isSelected) {
      return "bg-gradient-to-br from-indigo-500 to-indigo-600";
    }
    return "bg-gradient-to-br from-amber-50 to-amber-100";
  };

  // Get shadow style based on state
  const getShadowStyle = () => {
    if (isSelected) {
      return "shadow-inner shadow-indigo-700/30";
    }
    return "shadow-lg shadow-amber-900/10";
  };

  return (
    <div
      className={`
        relative select-none
        w-16 h-16 md:w-20 md:h-20
        flex items-center justify-center
        rounded-xl font-bold text-2xl md:text-3xl
        cursor-pointer
        transform transition-all duration-150 ease-in-out
        ${getBackgroundStyle()}
        ${getShadowStyle()}
        ${isSelected ? "text-white scale-95" : "text-slate-800"}
        ${
          isSelectable && !isSelected
            ? "hover:bg-amber-200 hover:scale-105"
            : ""
        }
        ${!isSelectable && !isSelected ? "opacity-90" : ""}
        ${isSelected ? "ring-2 ring-indigo-300" : ""}
      `}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={onMouseUp}
      onTouchStart={() => onMouseDown(row, col)}
      onTouchMove={(e) => {
        // Touch move handling would require more complex implementation
        // to detect which die is being touched
        e.preventDefault();
      }}
      onTouchEnd={onMouseUp}
    >
      {isQu ? (
        <span className="text-lg md:text-xl tracking-tighter font-bold">
          Qu
        </span>
      ) : (
        letter
      )}
      {isSelected && selectionIndex !== null && (
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-400 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-md border-2 border-white">
          {selectionIndex}
        </div>
      )}
    </div>
  );
};

export default Die;
