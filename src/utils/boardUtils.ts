import { DICE, SPECIAL_LETTERS } from "../constans/gameConstans";

/**
 * Generates a random Boggle board using the official dice distribution
 * @returns A 2D array representing the Boggle board
 */
export function generateBoard(): string[][] {
  // Shuffle the dice
  const shuffledDice = [...DICE].sort(() => Math.random() - 0.5);

  // Create a 4x4 board
  const board: string[][] = [];

  for (let i = 0; i < 4; i++) {
    const row: string[] = [];
    for (let j = 0; j < 4; j++) {
      const dieIndex = i * 4 + j;
      const die = shuffledDice[dieIndex];
      // Randomly select one face of the die (0-5)
      const faceIndex = Math.floor(Math.random() * 6);
      const letter = die.charAt(faceIndex);

      // Handle special case for 'Q' which is always followed by 'u' in Boggle
      row.push(SPECIAL_LETTERS[letter] || letter);
    }
    board.push(row);
  }

  return board;
}

/**
 * Checks if two positions are adjacent on the board
 */
export function areAdjacent(
  pos1: [number, number],
  pos2: [number, number]
): boolean {
  const [row1, col1] = pos1;
  const [row2, col2] = pos2;

  const rowDiff = Math.abs(row1 - row2);
  const colDiff = Math.abs(col1 - col2);

  // Adjacent if both row and column differences are at most 1
  return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
}

/**
 * Checks if a path forms a valid word according to Boggle rules
 * @param path Array of positions representing the path
 * @returns true if the path is valid, false otherwise
 */
export function isValidPath(path: [number, number][]): boolean {
  if (path.length < 1) return false;

  // Check if all adjacent positions are actually adjacent
  for (let i = 1; i < path.length; i++) {
    if (!areAdjacent(path[i - 1], path[i])) {
      return false;
    }
  }

  // Check for duplicate positions
  const positionSet = new Set<string>();

  for (const [row, col] of path) {
    const posKey = `${row},${col}`;
    if (positionSet.has(posKey)) {
      return false;
    }
    positionSet.add(posKey);
  }

  return true;
}

/**
 * Forms a word from a path on the board
 * @param board The Boggle board
 * @param path Array of positions
 * @returns The word formed by the path
 */
export function getWordFromPath(
  board: string[][],
  path: [number, number][]
): string {
  return path.map(([row, col]) => board[row][col]).join("");
}

/**
 * Gets all possible adjacent positions to a given position
 * @param row Row index
 * @param col Column index
 * @param boardSize Size of the board (default 4)
 * @returns Array of adjacent positions
 */
export function getAdjacentPositions(
  row: number,
  col: number,
  boardSize: number = 4
): [number, number][] {
  const adjacent: [number, number][] = [];

  for (
    let r = Math.max(0, row - 1);
    r <= Math.min(boardSize - 1, row + 1);
    r++
  ) {
    for (
      let c = Math.max(0, col - 1);
      c <= Math.min(boardSize - 1, col + 1);
      c++
    ) {
      if (r !== row || c !== col) {
        adjacent.push([r, c]);
      }
    }
  }

  return adjacent;
}
