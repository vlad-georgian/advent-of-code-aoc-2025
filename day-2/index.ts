export function partOne(ranges: string[]): number {
    if (!ranges?.length) {
        throw new Error('Invalid ranges provided');
    }

    let invalidSum = 0;

    for (const range of ranges) {
        const [rangeStart, rangeEnd] = range.trim().split('-').map(Number);

        if (Number.isNaN(rangeStart) || Number.isNaN(rangeEnd)) {
            throw new Error(`Invalid number provided for range: ${rangeStart}-${rangeEnd}`);
        }

        for (let current = rangeStart; current <= rangeEnd; current++) {
            const currentStr = current.toString();

            if (currentStr.length % 2) {
                continue;
            }

            const left = currentStr.slice(0, currentStr.length / 2);
            const right = currentStr.slice(currentStr.length / 2, currentStr.length);

            if (left === right) {
                invalidSum += current;
            }
        }
    }

    return invalidSum;
}

export function partTwo(ranges: string[]): number {
    if (!ranges?.length) {
        throw new Error('Invalid ranges provided');
    }

    let invalidSum = 0;

    for (const range of ranges) {
        const [rangeStart, rangeEnd] = range.trim().split('-').map(Number);

        if (Number.isNaN(rangeStart) || Number.isNaN(rangeEnd)) {
            throw new Error(`Invalid number provided for range: ${rangeStart}-${rangeEnd}`);
        }

        for (let current = rangeStart; current <= rangeEnd; current++) {
            const currentStr = current.toString();
            let subdivisionCount = 2;
            let isInvalid = false;

            while (!isInvalid && subdivisionCount <= currentStr.length) {
                isInvalid = areSubdivisionsEqual(currentStr, subdivisionCount);
                subdivisionCount++;
            }

            if (isInvalid) {
                invalidSum += current;
            }
        }
    }

    return invalidSum;
}

function areSubdivisionsEqual(source: string, subdivisions: number): boolean {
    if (source.length % subdivisions !== 0) {
        return false;
    }

    let mainSlice: string | undefined;

    /// 111, 3
    for (let i = 0; i < subdivisions; i++) {
        const sliceLength = source.length / subdivisions;
        const slice = source.slice(sliceLength * i, sliceLength * (i + 1));

        if (mainSlice === undefined) {
            mainSlice = slice;
        } else if (mainSlice !== slice) {
            return false;
        }
    }

    return true;
}

export function parse(input: string): string[] {
    return input.toString().split(',');
}

export function* solve(input: string): Generator<[string, string, number]> {
    const ranges = parse(input);

    yield ['Day 2: Gift shop - Part 1', 'Sum', partOne(ranges)];
    return ['Day 2: Gift shop  - Part 2', 'Sum', partTwo(ranges)];
}
