type Tile = "empty" | "wall" | "start" | "end" | "obstacle";

type Position = {
    x: number,
    y: number
}

type Grid = Tile[][]

export function getEgdeCoordinates(grid: Grid): Position[] {
    const edgeCoordinates: Position[] = [];
    const rows = grid.length;
    const cols = grid[0]?.length || 0;

    if (rows === 0 || cols === 0) {
        return [];
    }

    // Top row
    for (let y = 0; y < cols; y++) {
        edgeCoordinates.push({ x: 0, y });
    }

    // Bottom row
    for (let y = 0; y < cols; y++) {
        edgeCoordinates.push({ x: rows - 1, y });
    }

    // Left column (excluding corners)
    for (let x = 1; x < rows - 1; x++) {
        edgeCoordinates.push({ x, y: 0 });
    }

    // Right column (excluding corners)
    for (let x = 1; x < rows - 1; x++) {
        edgeCoordinates.push({ x, y: cols - 1 });
    }

    return edgeCoordinates;
}

export function initializeBoard(rows: number, cols: number, obstacleCount: number): Grid {
    const grid: Grid = [];

    for (let x = 0; x < rows; x++) {
        const col: Tile[] = new Array<Tile>(cols).fill('empty');
        const row: Tile[][] = new Array<Tile[]>(col);
        console.log(row)    
    }
    return grid
}
