// Method: Brute force
export function partTwoBrute(batteries: string[]): number {
    if (!batteries?.length) {
        throw new Error('No voltage ratings provided')
    }

    performance.mark('p2-start')

    let joltageSum = 0

    // O(n * m * 12)
    for (const battery of batteries) {
        const joltCandidateParts: number[] = []

        for (let batteryIndex = 0; batteryIndex < battery.length; batteryIndex++) {
            const jolt = Number(battery[batteryIndex])

            if (joltCandidateParts.length < 12) {
                joltCandidateParts.push(jolt)

                continue
            }

            let shiftMaxValueIndex = -1
            let shiftMaxValue = joltCandidateParts.reduce((total, current) => total * 10 + current, 0)

            for (let partIndex = 0; partIndex < joltCandidateParts.length; partIndex++) {
                let joltCandidateValue = joltCandidateParts.reduce((total, current, index) => {
                    if (index === partIndex) {
                        return total
                    }

                    return total * 10 + current
                }, 0)
                joltCandidateValue = joltCandidateValue * 10 + jolt

                if (joltCandidateValue > shiftMaxValue) {
                    shiftMaxValue = joltCandidateValue
                    shiftMaxValueIndex = partIndex
                }
            }

            if (shiftMaxValueIndex !== -1) {
                joltCandidateParts.splice(shiftMaxValueIndex, 1)
                joltCandidateParts.push(jolt)
            }
        }

        joltageSum += joltCandidateParts.reduce((joltage, digit) => joltage * 10 + digit, 0)
    }

    return joltageSum
}
