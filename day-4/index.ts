const adjacentRollLimit = 4;

function getRollsAroundItem(diagram: string[][], i: number, j: number): number {
    let rollCount = 0;
    const rowCount = diagram.length;
    const columnCount = diagram[0].length;

    const isRollOfPaper = (item: string): boolean => ['@', 'x'].includes(item);

    // Top row
    if (i > 0) {
        rollCount += j > 0 && isRollOfPaper(diagram[i - 1][j - 1]) ? 1 : 0;
        rollCount += isRollOfPaper(diagram[i - 1][j]) ? 1 : 0;
        rollCount += j < columnCount - 1 && isRollOfPaper(diagram[i - 1][j + 1]) ? 1 : 0;
    }

    // Current row
    rollCount += j > 0 && isRollOfPaper(diagram[i][j - 1]) ? 1 : 0;
    rollCount += j < columnCount - 1 && isRollOfPaper(diagram[i][j + 1]) ? 1 : 0;

    // Bottom row
    if (i < rowCount - 1) {
        rollCount += j > 0 && isRollOfPaper(diagram[i + 1][j - 1]) ? 1 : 0;
        rollCount += isRollOfPaper(diagram[i + 1][j]) ? 1 : 0;
        rollCount += j < columnCount - 1 && isRollOfPaper(diagram[i + 1][j + 1]) ? 1 : 0;
    }

    return rollCount;
}

export function partOne(diagram: string[][]): number {
    if (!diagram?.length) {
        throw new Error('No diagram provided');
    }

    const rowCount = diagram.length;
    const columnCount = diagram[0].length;
    let accessibleCount = 0;

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            if (diagram[rowIndex][columnIndex] !== '@') {
                continue;
            }

            const rollsCount = getRollsAroundItem(diagram, rowIndex, columnIndex);

            if (rollsCount >= adjacentRollLimit) {
                continue;
            }

            diagram[rowIndex][columnIndex] = 'x';

            accessibleCount++;
        }
    }

    return accessibleCount;
}

export function partTwo(diagram: string[][]): number {
    if (!diagram?.length) {
        throw new Error('No diagram provided');
    }

    const rowCount = diagram.length;
    const columnCount = diagram[0].length;
    let accessibleCount = 0;

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            // Use this instead if you want to visualize each step
            // if (diagram[rowIndex][columnIndex] === 'x') {
            //     diagram[rowIndex][columnIndex] = '.';
            // }
            if (diagram[rowIndex][columnIndex] !== '@') {
                continue;
            }

            const rollsCount = getRollsAroundItem(diagram, rowIndex, columnIndex);

            if (rollsCount >= adjacentRollLimit) {
                continue;
            }

            diagram[rowIndex][columnIndex] = '.';
            // Use this instead if you want to visualize each step
            // diagram[rowIndex][columnIndex] = 'x';

            accessibleCount++;
        }
    }

    if (accessibleCount === 0) {
        return 0;
    }

    const secondRunCount = partTwo(diagram);

    return accessibleCount + secondRunCount;
}

export function parse(input: string): string[][] {
    return input
        .toString()
        .trimEnd()
        .split('\r\n')
        .map((row) => row.split(''));
}

export function* solve(input: string): Generator<(string | number)[]> {
    const diagram = parse(input);

    yield ['Day 4: Printing department - Part 1', 'Max accessible', partOne(diagram)];
    return ['Day 4: Printing department - Part 2', 'Max accessible', partTwo(diagram)];
}
