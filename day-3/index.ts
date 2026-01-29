export function partOne(batteries: string[]): number {
    if (!batteries?.length) {
        throw new Error('No voltage ratings provided');
    }

    let joltageSum = 0;

    for (const battery of batteries) {
        let joltLargest = 0;
        let singleDigitLargest = 0;

        for (let i = 0; i < battery.length; i++) {
            const jolt = Number(battery[i]);
            let joltCandidate = (joltLargest % 10) + jolt;

            if (singleDigitLargest) {
                const joltExtraCandidate = singleDigitLargest * 10 + jolt;
                joltCandidate = joltExtraCandidate > joltCandidate ? joltExtraCandidate : joltCandidate;
            }

            joltLargest = joltCandidate > joltLargest ? joltCandidate : joltLargest;
            singleDigitLargest = jolt > singleDigitLargest ? jolt : singleDigitLargest;
        }

        joltageSum += joltLargest;
    }

    return joltageSum;
}

// Method: Brute force
export function partTwoBrute(batteries: string[]): number {
    if (!batteries?.length) {
        throw new Error('No voltage ratings provided');
    }

    performance.mark('p2-start');

    let joltageSum = 0;

    // O(n * m * 12)
    for (const battery of batteries) {
        const joltCandidateParts: number[] = [];

        for (let i = 0; i < battery.length; i++) {
            const jolt = Number(battery[i]);

            if (joltCandidateParts.length < 12) {
                joltCandidateParts.push(jolt);

                continue;
            }

            let shiftMaxValueIndex = -1;
            let shiftMaxValue = joltCandidateParts.reduce((total, current) => total * 10 + current, 0);

            for (let partIndex = 0; partIndex < joltCandidateParts.length; partIndex++) {
                let joltCandidateValue = joltCandidateParts.reduce((total, current, index) => {
                    if (index === partIndex) {
                        return total;
                    }

                    return total * 10 + current;
                }, 0);
                joltCandidateValue = joltCandidateValue * 10 + jolt;

                if (joltCandidateValue > shiftMaxValue) {
                    shiftMaxValue = joltCandidateValue;
                    shiftMaxValueIndex = partIndex;
                }
            }

            if (shiftMaxValueIndex !== -1) {
                joltCandidateParts.splice(shiftMaxValueIndex, 1);
                joltCandidateParts.push(jolt);
            }
        }

        joltageSum += joltCandidateParts.reduce((joltage, digit) => joltage * 10 + digit, 0);
    }

    return joltageSum;
}

// Method: Sliding window
export function partTwoWindow(batteries: string[]): number {
    if (!batteries?.length) {
        throw new Error('No voltage ratings provided');
    }

    performance.mark('p2-start');

    let joltageSum: number = 0;

    for (const battery of batteries) {
        const joltMax: number[] = [];
        const joltages = [...battery].map(Number);
        let start = 0;
        let needed = 12;

        /*
         * Maintain a sliding window:
         * -> starting at: the largest number we've already found
         * -> ending at: the minimum slots we need to fill in the rest of the number
         * and hunt for the largest number in that sliding window
         */
        while (needed) {
            const end = joltages.length - needed + 1;

            // Find the largest number in the window
            for (let joltageIndex = start; joltageIndex < end; joltageIndex++) {
                if (joltages[joltageIndex] <= joltages[start]) {
                    continue;
                }

                start = joltageIndex;
            }

            joltMax.push(joltages[start]);

            // Slide the window to the right
            start++;
            needed--;
        }

        joltageSum += Number(joltMax.join(''));
    }

    return joltageSum;
}
export function parse(input: string): string[] {
    return input.toString().trimEnd().split('\r\n');
}

export function* solve(input: string): Generator<(string | number)[]> {
    const lines = parse(input);

    yield ['Day 3: Lobby - Part 1', 'Joltage sum', partOne(lines)];
    yield ['Day 3: Lobby - Part 2 (Brute force)', 'Joltage sum', partTwoBrute(lines)];
    return ['Day 3: Lobby - Part 2 (Sliding window)', 'Joltage sum', partTwoWindow(lines)];
}
