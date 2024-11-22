import { functionTypeAnnotation } from "@babel/types";

export type Tile = "empty" | "wall" | "start" | "end" | "obstacle";

export type Position = {
    x: number,
    y: number
}

export type Grid = Tile[][]

export function getEgdeCoordinates(grid: Grid): Position[] {
    const edgeCoordinates: Position[] = [];
    const cols = grid[0]?.length || 0;
    const rows = grid.length;

    if (rows === 0 || cols === 0) {
        return [];
    }

    // Left
    for (let y = 1; y < rows - 1; y++) {
        edgeCoordinates.push({ x: 0, y });
    }

    // Right
    for (let y = 1; y < rows - 1; y++) {
        edgeCoordinates.push({ x: cols - 1, y });
    }

    // Top
    for (let x = 0; x < cols; x++) {
        edgeCoordinates.push({ x, y: 0 });
    }

    // Bottom
    for (let x = 0; x < cols; x++) {
        edgeCoordinates.push({ x, y: rows - 1 });
    }

    return edgeCoordinates;
}

export function checkMove(grid: Grid, futurePosition:Position ): Position | boolean {
    if (!isValidPosition(grid, futurePosition)) {
        return false
    }
    const futureField = getFieldGrid(grid, futurePosition);
    if (futureField === 'empty' || futureField === 'wall' || futureField === 'start') {
        return futurePosition
    }

    if (futureField === 'end') {
        return true
    }
    return false
}

export function left(grid: Grid, currentPosition: Position): Position | boolean {
    const futurePosition: Position = {x:currentPosition.x - 1, y:currentPosition.y} 
    return checkMove(grid, futurePosition)
}

export function right(grid: Grid, currentPosition: Position): Position | boolean {
    const futurePosition: Position = {x:currentPosition.x + 1, y:currentPosition.y} 
    return checkMove(grid, futurePosition)
}

export function up(grid: Grid, currentPosition: Position): Position | boolean {
    const futurePosition: Position = {x:currentPosition.x, y:currentPosition.y - 1} 
    return checkMove(grid, futurePosition)
}

export function down(grid: Grid, currentPosition: Position): Position | boolean {
    const futurePosition: Position = {x:currentPosition.x, y:currentPosition.y + 1} 
    return checkMove(grid, futurePosition)
}

export function generateBoard(cols: number, rows: number): Grid {
    const grid: Grid = [];

    if (rows < 5 || cols < 5) {
        throw new Error("Board to small")
    }

    if (rows < 0 || cols < 0) {
        throw new Error("Negative values")
    }

    for (let y = 0; y < rows; y++) {
        const row: Tile[] = new Array<Tile>(cols).fill('empty');
        grid.push(row)
    }
    return grid
}

export function getFieldGrid(grid: Grid, position: Position) {
    const { x, y } = position;
    return grid[y][x];
}

export function addFieldGrid(grid: Grid, position: Position, tile: Tile) {
    const { x, y } = position;
    const cols = grid[0]?.length || 0;
    const rows = grid.length;
    if (rows < y || cols < x || y < 0 || x < 0) {
        throw new Error("Outside range of board")
    }
    if (grid[y][x] === "start" || grid[y][x] === "end") {
        throw new Error("Start/end field covered")
    }
    grid[y][x] = tile
}

export function isValidPosition (grid: Grid, pos: Position):boolean {
    const rows = grid.length;
    const cols = grid[0]?.length || 0;
    return pos.x >= 0 && pos.x < cols && pos.y >= 0 && pos.y < rows;
}
    

export function isNextToOrTheSamePosition(grid: Grid, a: Position, b: Position): boolean {

    const isTheSamePosition = () => a.x === b.x && a.y === b.y

    if (!isValidPosition(grid, a) || !isValidPosition(grid, b)) {
        throw new Error("Outside range of board");
    }

    if (isTheSamePosition()) {
        return true
    }

    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);

    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}

export function generateObstacles(grid: Grid, numObstacles: number): void {
    const rows = grid.length;
    const cols = grid[0]?.length || 0;

    const maxObstacles = rows * cols / 4;

    if (numObstacles > maxObstacles) {
        throw new Error("Too many obstacles")
    }

    let placedObstacles = 0;

    while (placedObstacles < numObstacles) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);

        if (grid[randomRow][randomCol] === "empty") {
            addFieldGrid(grid, { x: randomCol, y: randomRow }, "obstacle")
            placedObstacles++;
        }
    }
}

export function generateStartStop(grid: Grid): void {
    const walls = getEgdeCoordinates(grid)
    const length = walls.length

    const randomStartFieldIndex = Math.floor(Math.random() * length);
    const startField = walls[randomStartFieldIndex];
    let endField: Position;

    do {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * length);
        }
        while (randomIndex === randomStartFieldIndex)

        endField = walls[randomIndex]
    }
    while (isNextToOrTheSamePosition(grid, startField, endField))

    addFieldGrid(grid, startField, "start");
    addFieldGrid(grid, endField, "end");
}

export function printBoard(grid: Grid): void {
    const formattedBoard = grid.map(row => 
        row.map(cell => cell.padEnd(10, ' ')).join('')
    ).join('\n');

    console.log(formattedBoard);
}

export function findFirstOccurence(grid: Grid, type: Tile): Position | null {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === type) {
                return { x: col, y:row };
            }
        }
    }
    return null;
}

function main(): void {
    const board = generateBoard(8, 10);
    generateStartStop(board);
    generateObstacles(board, 10);
    printBoard(board);
}

main();