// Define the dice faces as they appear in the original Boggle game
// Each string represents one die with its 6 possible faces
export const DICE = [
  "AAEEGN",
  "ABBJOO",
  "ACHOPS",
  "AFFKPS",
  "AOOTTW",
  "CIMOTU",
  "DEILRX",
  "DELRVY",
  "DISTTY",
  "EEGHNW",
  "EEINSU",
  "EHRTVW",
  "EIOSST",
  "ELRTTY",
  "HIMNQU",
  "HLNNRZ",
];

// Letter frequency for English language, used as weight when selecting random letters
export const LETTER_FREQUENCY: Record<string, number> = {
  A: 8.2,
  B: 1.5,
  C: 2.8,
  D: 4.3,
  E: 12.7,
  F: 2.2,
  G: 2.0,
  H: 6.1,
  I: 7.0,
  J: 0.2,
  K: 0.8,
  L: 4.0,
  M: 2.4,
  N: 6.7,
  O: 7.5,
  P: 1.9,
  Q: 0.1,
  R: 6.0,
  S: 6.3,
  T: 9.1,
  U: 2.8,
  V: 1.0,
  W: 2.4,
  X: 0.2,
  Y: 2.0,
  Z: 0.1,
};

// Special handling for 'Qu' as a single unit in Boggle
export const SPECIAL_LETTERS: Record<string, string> = {
  Q: "Qu",
};

// Game settings
export const GAME_SETTINGS = {
  DEFAULT_TIMER: 180, // 3 minutes in seconds
  BOARD_SIZE: 4, // 4x4 grid
  MIN_WORD_LENGTH: 3,
};

// Scoring rules based on word length
export const SCORING_RULES: Record<number, number> = {
  3: 1,
  4: 1,
  5: 2,
  6: 3,
  7: 5,
  8: 11, // 8+ letters
};
