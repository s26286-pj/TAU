import { functionTypeAnnotation } from "@babel/types";

export type Tile = "empty" | "wall" | "start" | "end" | "obstacle";

export type Position = {
    x: number,
    y: number
}

export type Grid = Tile[][]

export function getEgdeCoordinates(grid: Grid): Position[] {
    const edgeCoordinates: Position[] = [];
    const rows = grid[0]?.length || 0;
    const cols = grid.length;

    if (rows === 0 || cols === 0) {
        return [];
    }

    // Left
    for (let y = 0; y < cols; y++) {
        edgeCoordinates.push({ x: 0, y });
    }

    // Right
    for (let y = 0; y < cols; y++) {
        edgeCoordinates.push({ x: rows - 1, y });
    }

    // Top (excluding corners)
    for (let x = 1; x < rows - 1; x++) {
        edgeCoordinates.push({ x, y: 0 });
    }

    // Bottom (excluding corners)
    for (let x = 1; x < rows - 1; x++) {
        edgeCoordinates.push({ x, y: cols - 1 });
    }

    return edgeCoordinates;
}

export function left(): boolean {
    return true
}

export function right(): boolean {
    return true
}

export function top(): boolean {
    return true
}

export function bottom(): boolean {
    return true
}

export function checkMove(): boolean {
    return true
}

export function isMoveOutBoard(): boolean {
    return true
}

export function isMoveInObstacle(): boolean {
    return true
}

export function generateBoard(cols: number, rows: number, obstacleCount: number): Grid {
    const grid: Grid = [];

    if (rows < 5 || cols < 5) {
        throw new Error("Board to small")
    }

    for (let x = 0; x < rows; x++) {
        const col: Tile[] = new Array<Tile>(cols).fill('empty');
        grid.push(col)
    }
    return grid
}
