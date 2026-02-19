// Method: Sliding window
export function partTwoWindow(batteries: string[]): number {
    if (!batteries?.length) {
        throw new Error('No voltage ratings provided')
    }

    performance.mark('p2-start')

    let joltageSum: number = 0

    for (const battery of batteries) {
        const joltMax: number[] = []
        const joltages = [...battery].map(Number)
        let start = 0
        let needed = 12

        /*
         * Maintain a sliding window:
         * -> starting at: the largest number we've already found
         * -> ending at: the minimum slots we need to fill in the rest of the number
         * and hunt for the largest number in that sliding window
         */
        while (needed) {
            const end = joltages.length - needed + 1

            // Find the largest number in the window
            for (let joltageIndex = start; joltageIndex < end; joltageIndex++) {
                if (joltages[joltageIndex]! <= joltages[start]!) {
                    continue
                }

                start = joltageIndex
            }

            joltMax.push(joltages[start]!)

            // Slide the window to the right
            start++
            needed--
        }

        joltageSum += Number(joltMax.join(''))
    }

    return joltageSum
}
