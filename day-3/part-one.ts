export function partOne(batteries: string[]): number {
    if (!batteries?.length) {
        throw new Error('No voltage ratings provided')
    }

    let joltageSum = 0

    for (const battery of batteries) {
        let joltLargest = 0
        let singleDigitLargest = 0

        for (let batteryIndex = 0; batteryIndex < battery.length; batteryIndex++) {
            const jolt = Number(battery[batteryIndex])
            let joltCandidate = (joltLargest % 10) + jolt

            if (singleDigitLargest) {
                const joltExtraCandidate = singleDigitLargest * 10 + jolt
                joltCandidate = joltExtraCandidate > joltCandidate ? joltExtraCandidate : joltCandidate
            }

            joltLargest = joltCandidate > joltLargest ? joltCandidate : joltLargest
            singleDigitLargest = jolt > singleDigitLargest ? jolt : singleDigitLargest
        }

        joltageSum += joltLargest
    }

    return joltageSum
}
