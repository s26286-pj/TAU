import { getEgdeCoordinates, left, right, up, down, generateBoard, addFieldGrid, Grid, generateObstacles, isNextToOrTheSamePosition, generateStartStop, findFirstOccurence, printBoard, Tile } from '../game';

describe('Generate board - generateBoard', () => {
  test('should throw error on too small board', () => {
    expect(() => {
      generateBoard(4, 5);
    }).toThrow();
  });

  test('should throw error when try to use negative numbers', () => {
    expect(() => {
      generateBoard(4, -5);
    }).toThrow();
  });

  test('should return board of minimal size', () => {
    const rows = 5;
    const cols = 5;
    const board = generateBoard(cols, rows);

    expect(board.length).toBe(rows);
    expect(board[0].length).toBe(cols);
  });

  test('should return board of size 5x10', () => {
    const rows = 10;
    const cols = 5;
    const board = generateBoard(cols, rows);

    expect(board.length).toBe(rows);
    expect(board[0].length).toBe(cols);
  });
});

describe('Get egde (walls) coordinates - getEgdeCoordinates', () => {
  it("should return correct edge coordinates for a board", () => {
    const board: Grid = generateBoard(5, 7);

    const expectedEdges = [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
      { x: 0, y: 1 },                                                 { x: 4, y: 1 },
      { x: 0, y: 2 },                                                 { x: 4, y: 2 },
      { x: 0, y: 3 },                                                 { x: 4, y: 3 },
      { x: 0, y: 4 },                                                 { x: 4, y: 4 },
      { x: 0, y: 5 },                                                 { x: 4, y: 5 },
      { x: 0, y: 6 }, { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }
    ];

    const edges = getEgdeCoordinates(board);

    expectedEdges.forEach(egde => {
      expect(edges).toContainEqual(egde);
    });

    expect(edges.length).toEqual(expectedEdges.length);
  });

  it("should return correct edge coordinates for a board 2", () => {
    const board: Grid = generateBoard(7, 5);
    
    const expectedEdges = [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 },
      { x: 0, y: 1 },                                                                                 { x: 6, y: 1 },
      { x: 0, y: 2 },                                                                                 { x: 6, y: 2 },
      { x: 0, y: 3 },                                                                                 { x: 6, y: 3 },
      { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }
    ]

    const edges = getEgdeCoordinates(board);

    expectedEdges.forEach(egde => {
      expect(edges).toContainEqual(egde);
    });

    expect(edges.length).toEqual(expectedEdges.length);
  });

  it("should return correct edge coordinates for a board 3", () => {
    const board: Grid = generateBoard(6, 5);
    
    const expectedEdges = [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 },
      { x: 0, y: 1 },                                                                 { x: 5, y: 1 },
      { x: 0, y: 2 },                                                                 { x: 5, y: 2 },
      { x: 0, y: 3 },                                                                 { x: 5, y: 3 },
      { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 },
    ]

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

describe('Add field to board - addFieldGrid', () => {
  it("should change value of field of board", () => {
    const board: Grid = generateBoard(5, 6);
    addFieldGrid(board, {x: 1, y: 0}, "wall")
    expect(board[0][1]).toEqual("wall");
  })

  it("should change value of field on egde of board", () => {
    const board: Grid = generateBoard(7, 6);
    addFieldGrid(board, {x: 6, y: 5}, "wall")
    expect(board[5][6]).toEqual("wall");
  })

  test('should throw error when try to add field outside size of board', () => {
    const board: Grid = generateBoard(5, 6);
    expect(() => {
      addFieldGrid(board, {x: 1, y: 7}, "wall");
    }).toThrow();
  });

  test('should throw error when try to use negative numbers', () => {
    const board: Grid = generateBoard(5, 6);
    expect(() => {
      addFieldGrid(board, {x: 1, y: -1}, "wall");
    }).toThrow();
  });

  test('should throw error when try to overwrite start/end field', () => {
    const board: Grid = generateBoard(5, 6);
    addFieldGrid(board, {x:0, y:0}, "start");
    addFieldGrid(board, {x:0, y:3}, "end");
    expect(() => {
      addFieldGrid(board, {x:0, y:0}, "obstacle");
    }).toThrow();
    expect(() => {
      addFieldGrid(board, {x:0, y:3}, "obstacle");
    }).toThrow();
  });
});

describe('Generate Obstacles fields - generateObstacles', () => {
  it("should generate obstacles", () => {
    const board: Grid = generateBoard(5, 6);
    generateObstacles(board, 3)

    let obstacleCount = 0;
    for (const row of board) {
      for (const tile of row) {
        if (tile === "obstacle") {
          obstacleCount++;
        }
      }
    }
    expect(obstacleCount).toEqual(3);
  })
  it("should throw when is to many obstacles", () => {
    const board: Grid = generateBoard(5, 6);
    expect(() => {
      generateObstacles(board, 30)
    }).toThrow();
  })
  it("should throw when is to many obstacles - upper treshold", () => {
    const board: Grid = generateBoard(5, 6);
    expect(() => {
      generateObstacles(board, 8)
    }).toThrow();
  })
  it("should generate obstacles - lower treshold", () => {
    const board: Grid = generateBoard(5, 6);
    generateObstacles(board, 7)

    let obstacleCount = 0;
    for (const row of board) {
      for (const tile of row) {
        if (tile === "obstacle") {
          obstacleCount++;
        }
      }
    }
    expect(obstacleCount).toEqual(7);
  })
})

describe('Check if those fields are next to each other - isNextToOrTheSamePosition', () => {
  let board: Grid;
  beforeEach(() => {
    board = generateBoard(6, 5)
  }); 
  it("should check the same position as true", () => {
    expect(isNextToOrTheSamePosition(board, {x: 0, y:0}, {x: 0, y:0})).toEqual(true)
  })

  it("should check the side by side position as true", () => {
    expect(isNextToOrTheSamePosition(board, { x: 1, y: 0 }, { x: 2, y: 0 })).toEqual(true)
  })

  it("should check the side by side position as true 2", () => {
    expect(isNextToOrTheSamePosition(board, {x: 0, y:0}, {x: 0, y:1})).toEqual(true)
  })

  it("should check the one field separation position as false", () => {
    expect(isNextToOrTheSamePosition(board, {x: 0, y:0}, {x: 0, y:2})).toEqual(false)
  })

  test('should throw error on positions outside board', () => {
    expect(() => {
      isNextToOrTheSamePosition(board, {x: 0, y:4}, {x: 0, y:8});
    }).toThrow();
  });
});

describe('Generate Start and End fields - generateStartStop', () => {
  let board: Grid;
  beforeEach(() => {
    board = generateBoard(5, 7)
  }); 
  it("should generate start and stop", () => {
    generateStartStop(board)

    let startCount = 0;
    for (const row of board) {
      for (const tile of row) {
        if (tile === "start") {
          startCount++;
        }
      }
    }
    let endCount = 0;
    for (const row of board) {
      for (const tile of row) {
        if (tile === "end") {
          endCount++;
        }
      }
    }

    expect(endCount).toEqual(1);
    expect(startCount).toEqual(1);
  })

  it("should generate end on edge", () => {
    generateStartStop(board)
    const edges = getEgdeCoordinates(board);
    const pos = findFirstOccurence(board, 'end')

    expect(edges).toContainEqual(pos);
  })

  it("should generate start on edge", () => {
    generateStartStop(board)
    const edges = getEgdeCoordinates(board);
    const pos = findFirstOccurence(board, 'start')

    expect(edges).toContainEqual(pos);
  })
});

describe('Movement - left, right, up, down', () => {
  let board: Grid;
  beforeEach(() => {
    board = [
      ['wall',      'start', 'obstacle', 'wall',  'wall',   'wall',   'wall'],
      ['obstacle',  'empty', 'obstacle', 'empty', 'empty',  'empty',  'wall'],
      ['obstacle',  'empty', 'obstacle', 'empty', 'empty',  'empty',  'wall'],
      ['wall',      'empty', 'empty',    'empty', 'empty',  'empty',  'wall'],
      ['wall',      'wall',   'wall',    'wall',  'end',    'wall',   'wall'],
    ]
  }); 
  it("should make move left from start", () => {
    expect(left(board, {x: 1, y: 0})).toEqual({x: 0, y: 0});
  })
  it("should not make move left into obstacle", () => {
    expect(left(board, {x: 1, y: 1})).toEqual(false);
  })
  it("should not make move left out of the board", () => {
    expect(left(board, {x: 0, y: 0})).toEqual(false);
  })
  it("should let make move into end", () => {
    expect(left(board, {x: 5, y: 4})).toEqual(true);
  })

  it("should not make move right from start", () => {
    expect(right(board, {x: 1, y: 0})).toEqual(false);
  })
  it("should not make move right into obstacle", () => {
    expect(left(board, {x: 1, y: 1})).toEqual(false);
  })
  it("should not make move right out of the board", () => {
    expect(right(board, {x: 6, y: 4})).toEqual(false);
  })
  it("should let make move into end", () => {
    expect(right(board, {x: 3, y: 4})).toEqual(true);
  })
  it("should let make move up", () => {
    expect(up(board, {x: 1, y: 2})).toEqual({x: 1, y: 1});
  })
  it("should let make move down", () => {
    expect(down(board, {x: 1, y: 2})).toEqual({x: 1, y: 3});
  })
});
