import React from "react";

interface WordListProps {
  words: string[];
  totalScore: number;
}

const WordList: React.FC<WordListProps> = ({ words, totalScore }) => {
  // Get score for a single word
  const getWordScore = (word: string): number => {
    const length = word.length;
    if (length < 3) return 0;
    if (length <= 4) return 1;
    if (length === 5) return 2;
    if (length === 6) return 3;
    if (length === 7) return 5;
    return 11; // 8+ letters
  };

  // Sort words by score (highest first)
  const sortedWords = [...words].sort(
    (a, b) => getWordScore(b) - getWordScore(a)
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 w-full max-w-md h-full max-h-[500px] overflow-hidden flex flex-col border border-slate-100">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">Words Found</h2>
        <div className="text-xl font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
          {totalScore} pts
        </div>
      </div>
      {words.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-slate-400 space-y-3 py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
          <p className="italic">No words found yet...</p>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
          <table className="w-full">
            <thead className="text-left text-slate-500 sticky top-0 bg-white">
              <tr>
                <th className="pb-2 font-medium">Word</th>
                <th className="pb-2 font-medium text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {sortedWords.map((word, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-2.5 font-medium text-slate-700">
                    {word}
                    {word.length >= 8 && (
                      <span className="ml-2 text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                        Great!
                      </span>
                    )}
                    {word.length === 7 && (
                      <span className="ml-2 text-xs px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                        Good!
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 text-right text-indigo-600 font-medium">
                    +{getWordScore(word)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {words.length > 0 && (
        <div className="pt-3 mt-3 border-t border-slate-100 text-sm text-slate-500 flex justify-between">
          <span>Total Words: {words.length}</span>
          <span>
            Avg Points: {(totalScore / words.length).toFixed(1)} per word
          </span>
        </div>
      )}
    </div>
  );
};

export default WordList;
