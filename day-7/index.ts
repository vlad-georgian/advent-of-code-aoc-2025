type PartOneResult = {
    result: number;
    mask: Map<string, string>;
};

type PartTwoResult = {
    result: number;
    iterations: number;
    cacheHits: number;
};

/*
 * Method: Straightforward approach. O(n*m)
 * The mask usage is optional here - it prevents the original array from getting modified
 */
function partOne(lines: string[]): PartOneResult {
    if (!lines?.length) {
        throw new Error('No diagram provided');
    }

    let total = 0;
    const columnCount = lines[0].length;
    const mask: Map<string, string> = new Map();

    // Helper method that ensure the mask values override the initial data
    const getCellValue = (rowIndex: number, columnIndex: number): string => {
        const key = `${rowIndex}:${columnIndex}`;
        return mask.has(key) ? mask.get(key)! : lines[rowIndex][columnIndex];
    };

    for (let rowIndex = 1; rowIndex < lines.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            // Only continue if we're below a "|" or "S"
            if (!['S', '|'].includes(getCellValue(rowIndex - 1, columnIndex))) {
                continue;
            }

            // If we're at a "^", update the columns on the line below
            if (getCellValue(rowIndex, columnIndex) === '^') {
                total++;

                if (columnIndex > 0) {
                    mask.set(`${rowIndex}:${columnIndex - 1}`, '|');
                    // linesProcessed[lineIndex] = `${linesProcessed[lineIndex].slice(0, columnIndex - 1)}|${linesProcessed[lineIndex].slice(columnIndex)}`;
                }

                if (columnIndex < columnCount - 1) {
                    mask.set(`${rowIndex}:${columnIndex + 1}`, '|');
                    // linesProcessed[lineIndex] = `${linesProcessed[lineIndex].slice(0, columnIndex + 1)}|${linesProcessed[lineIndex].slice(columnIndex + 2)}`;
                }

                continue;
            }

            // Since we're below a "|" or "S", update the current cell to also be "|"
            mask.set(`${rowIndex}:${columnIndex}`, '|');

            // linesProcessed[lineIndex] = `${linesProcessed[lineIndex].slice(0, columnIndex)}|${linesProcessed[lineIndex].slice(columnIndex + 1)}`;
        }
    }

    // Uncomment to visualize the result
    // for (let rowIndex = 1; rowIndex < lines.length; rowIndex++) {
    //     let rowContents = '';

    //     for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
    //         rowContents += getCellValue(rowIndex, columnIndex);
    //     }
    // }

    // A tuple is returned here because the mask is also needed for part 2
    return { result: total, mask };
}

// Method: Top-down dynamic programming. O(n*m)
function partTwo(lines: string[]): PartTwoResult {
    // Extract the mask from the result for part 1
    const { mask } = partOne(lines);

    const cache: Map<string, number> = new Map();
    let cacheHits: number = 0;
    let iterations: number = 0;

    // Helper method to help count the cache hits; not relevant to the solution
    const cacheFetch = (key: string): number => {
        cacheHits++;
        return cache.get(key)!;
    };

    // Helper method that ensure the mask values override the initial data
    const getCellValue = (rowIndex: number, columnIndex: number): string => {
        const key = `${rowIndex}:${columnIndex}`;
        return mask.has(key) ? mask.get(key)! : lines[rowIndex][columnIndex];
    };

    const dp = (row: number, column: number): number => {
        iterations++;

        if (row > lines.length - 1) {
            return 1;
        }

        const cellValue = getCellValue(row, column);

        if (['|', 'S'].includes(cellValue)) {
            const newRowKey = `${row + 1}-${column}`;

            if (cache.has(newRowKey)) {
                return cacheFetch(newRowKey)!;
            }

            const result = dp(row + 1, column);
            cache.set(`${row + 1}-${column}`, result);

            return result;
        } else if (cellValue === '^') {
            const leftColumnKey = `${row}-${column - 1}`;
            const rightColumnKey = `${row}-${column + 1}`;

            const leftResult = cache.has(leftColumnKey) ? cacheFetch(leftColumnKey) : dp(row, column - 1);
            const rightResult = cache.has(rightColumnKey) ? cacheFetch(rightColumnKey) : dp(row, column + 1);

            cache.set(leftColumnKey, leftResult);
            cache.set(rightColumnKey, rightResult);

            return leftResult + rightResult;
        }

        throw new Error('invalid state');
    };

    // Find the starting position
    for (let columnIndex = 0; columnIndex < lines[0].length; columnIndex++) {
        if (lines[0][columnIndex] !== 'S') {
            continue;
        }

        const result = dp(0, columnIndex);

        return { result, iterations, cacheHits };
    }

    throw new Error('Failed to find starting position!');
}

function parse(input: string) {
    return input.toString().trimEnd().split('\r\n');
}

function* solve(input: string): Generator<(string | number)[]> {
    const data = parse(input);

    let { result: partOneResult } = partOne(data);
    yield ['Day 7: Laboratories - Part 1', 'Total beam splits', partOneResult];

    let { result: partTwoResult, iterations, cacheHits } = partTwo(data);
    return [
        'Day 7: Laboratories - Part 2',
        'Total timelines',
        partTwoResult,
        `(Iterations: ${iterations}, Cached: ${cacheHits} ${((cacheHits * 100) / iterations).toFixed(2)}%)`,
    ];
}

export { partOne, partTwo, parse, solve };
