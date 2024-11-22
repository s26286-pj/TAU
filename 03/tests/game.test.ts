import { getEgdeCoordinates, generateBoard, Grid } from '../game';

describe('generateBoard', () => {
  test('should throw error on too small board', () => {
    expect(() => {
      generateBoard(4, 5, 0);
    }).toThrow();
  });

  test('should return board of minimal size', () => {
    const rows = 5;
    const cols = 5;
    const board = generateBoard(cols, rows, 0);

    expect(board.length).toBe(rows);
    expect(board[0].length).toBe(cols);
  });

  test('should return board of size 5x10', () => {
    const rows = 5;
    const cols = 10;
    const board = generateBoard(cols, rows, 0);

    expect(board.length).toBe(rows);
    expect(board[0].length).toBe(cols);
  });
});

describe('getEdgeCoordinates', () => {
  it("should return correct edge coordinates for a board", () => {
    const board: Grid = generateBoard(5, 6, 0);

    const expectedEdges = [
      { x: 0, y: 0 }, { y: 0, x: 1 }, { y: 0, x: 2 }, { y: 0, x: 3 }, { y: 0, x: 4 }, // Top row
      { y: 5, x: 0 }, { y: 5, x: 1 }, { y: 5, x: 2 }, { y: 5, x: 3 }, { y: 5, x: 4 }, // Bottom row
      { y: 1, x: 0 }, { y: 2, x: 0 }, { y: 3, x: 0 }, { y: 4, x: 0 },                 // Left column
      { y: 1, x: 4 }, { y: 2, x: 4 }, { y: 3, x: 4 }, { y: 4, x: 4 }                  // Right column
    ];

    const edges = getEgdeCoordinates(board);

    expectedEdges.forEach(egde => {
      expect(edges).toContainEqual(egde);
    });

    expect(edges.length).toEqual(expectedEdges.length);
  });

  it("should return an empty array for an empty board", () => {
    const board: Grid = [];
    const edges = getEgdeCoordinates(board);

    expect(edges).toEqual([]);
  });

});
