export type WordScore = {
  word: string;
  score: number;
};
type MultipleWordLists = {
  name: string;
  list: string[];
};

type MultipleListWordScore = {
  name: string;
  score: number;
};
/**
 * Calculates the score for a single word based on its length
 * @param word The word to score
 * @returns The score for the word
 */
export function calculateWordScore(word: string): number {
  const length = word.length;

  if (length < 3) return 0;
  if (length <= 4) return 1;
  if (length === 5) return 2;
  if (length === 6) return 3;
  if (length === 7) return 5;
  return 11; // 8+ letters
}

/**
 * Scores a list of words and returns detailed scoring information
 * @param wordList Array of words to score
 * @returns Array of objects containing each word and its score
 */
export function calculateWordListScore(wordList: string[]): number {
  return wordList
    .map((word) => ({
      word,
      score: calculateWordScore(word),
    }))
    .reduce((acc, current) => (acc += current.score), 0);
}

/**
 * Converts multiple word lists into their respective scores.
 * @param multipleLists The array of word lists to process.
 * @returns An array of names with their respective total scores.
 */
export function multipleWordLists(
  multipleLists: MultipleWordLists[]
): MultipleListWordScore[] {
  return multipleLists.map((list) => createWordScoreEntry(list));
}

/**
 * Creates a score entry for a given word list.
 * @param list The word list to convert into a score entry.
 * @returns An object containing the name and total score.
 */
function createWordScoreEntry(list: MultipleWordLists): MultipleListWordScore {
  const { name, list: wordList } = list;
  return {
    name,
    score: calculateWordListScore(wordList),
  };
}
