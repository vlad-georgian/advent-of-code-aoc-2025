// Method: Brute force check all ranges for an ingredient. O(n*m)
function partOne(data: string[]) {
    if (!data || data.length < 2) {
        throw new Error('Invalid input data provided!');
    }

    // Parsing stage
    const freshRanges = parseRanges(data[0]);
    const ingredients = parseIngredients(data[1]);

    if (!ingredients?.length || !freshRanges?.length) {
        return 0;
    }

    let freshCount = 0;

    for (const ingredient of ingredients) {
        let fresh = false;

        for (const freshRange of freshRanges) {
            if (ingredient < freshRange[0] || ingredient > freshRange[1]) {
                continue;
            }

            fresh = true;
            break;
        }

        if (!fresh) {
            continue;
        }

        freshCount++;
    }

    return freshCount;
}

// Method: Go through each range and check for overlaps with previous ranges. O(n^2)
function partTwo(data: string[]): number {
    if (!data || data.length < 2) {
        throw new Error('Invalid input data provided!');
    }

    // Parsing stage
    const freshRanges = parseRanges(data[0]);

    if (!freshRanges?.length) {
        return 0;
    }

    let freshCount = 0;

    // Sorting fixes the special case where a previous range in the list can bisect the current one
    freshRanges.sort((firstRange, secondRange) => firstRange[0] - secondRange[0]);

    for (let rangeIndex = 0; rangeIndex < freshRanges.length; rangeIndex++) {
        let start = freshRanges[rangeIndex][0];
        let end = freshRanges[rangeIndex][1];

        // console.log(`Evaluating range: ${start}-${end}`);

        let invalidRange = false;

        for (let candidateIndex = 0; candidateIndex < rangeIndex; candidateIndex++) {
            let startCandidate = freshRanges[candidateIndex][0];
            let endCandidate = freshRanges[candidateIndex][1];

            // Full overlap with a previous range - Everything gets discarded
            if (start >= startCandidate && end <= endCandidate) {
                // console.log(`Discarding ${start}-${end} because it's already covered by ${startCandidate}-${endCandidate}`);

                invalidRange = true;
                break;
            }

            // Partial overlap between start of current range and end of a previous range - Lower end gets discarded
            if (start >= startCandidate && start <= endCandidate) {
                // const previousStart = start

                start = endCandidate + 1;

                // console.log(`Found overlap between ${previousStart}-${end} and ${startCandidate}-${endCandidate}. Ajusted the new range to be ${start}-${end}`);

                if (end < start) {
                    console.log(`Discarding ${start}-${end} because the range is now invalid`);
                    invalidRange = true;
                    break;
                }
            }
        }

        if (invalidRange) {
            continue;
        }

        freshCount += end - start + 1;
    }

    return freshCount;
}

function parseRanges(rangesRaw: string) {
    if (!rangesRaw) {
        return [];
    }

    // Creates an array of tuples shaped like [ [start,end], ...]
    return rangesRaw.split('\r\n').map((range: string): [number, number] => {
        let parts = range.split('-');
        return [Number(parts[0]), Number(parts[1])];
    });
}

function parseIngredients(ingredientsRaw: string) {
    return ingredientsRaw.split('\r\n').map(Number);
}

function parse(input: string) {
    return input.toString().trimEnd().split('\r\n\r\n');
}

function* solve(input: string): Generator<(string | number)[]> {
    const data = parse(input);

    yield ['Day 5: Cafeteria - Part 1', 'Max fresh', partOne(data)];
    return ['Day 5: Cafeteria - Part 2', 'Max fresh', partTwo(data)];
}

export { partOne, partTwo, parse, solve };
