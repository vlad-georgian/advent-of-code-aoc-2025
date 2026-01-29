const dialMax = 100;
const dialStart = 50;

function partOne(rotations: string[]): number {
    if (!rotations?.length) {
        throw new Error('No rotations provided');
    }

    let current = dialStart;
    let timesAtZero = 0;

    for (const rotation of rotations) {
        const rotationCount: number = Number(rotation.slice(1)) % dialMax;
        switch (rotation[0]) {
            case 'R':
                current += rotationCount;
                break;
            case 'L':
                current -= rotationCount;
                if (current < 0) {
                    current = dialMax + (current % dialMax);
                }
                break;
            default:
                throw new Error(`Invalid rotation ${rotation}`);
        }

        current %= dialMax;

        // Add an extra rotation if we are at zero
        timesAtZero += Number(current === 0);
    }

    return timesAtZero;
}

function partTwo(rotations: string[]) {
    if (!rotations?.length) {
        throw new Error('No rotations provided');
    }

    performance.mark('p2-start');

    let current = dialStart;
    let timesAtZero = 0;

    for (const rotation of rotations) {
        if (!rotation[0]) {
            throw new Error(`Invalid rotation ${rotation}`);
        }

        const rotationCount: number = Number(rotation.slice(1));
        const oldCurrent: number = current;

        current += rotation[0] === 'R' ? rotationCount : -rotationCount;
        let overflowCount: number = Math.floor(Math.abs(current) / dialMax);

        if (current <= 0) {
            current = dialMax + (current % dialMax);
            if (oldCurrent !== 0) overflowCount++;
        }

        current %= dialMax;
        timesAtZero += overflowCount;
    }

    return timesAtZero;
}

function parse(input: string): string[] {
    return input.toString().trimEnd().split('\r\n');
}

function* solve(input: string): Generator<(string | number)[]> {
    const lines = parse(input);

    yield ['Day 1: Secret entrance - Part 1', 'Times at zero', partOne(lines)];
    return ['Day 1: Secret entrance - Part 2', 'Times at zero', partTwo(lines)];
}

export { partOne, partTwo, parse, solve };
