import { parseRanges } from './shared.ts'

// Method: Go through each range and check for overlaps with previous ranges. O(n^2)
export function partTwo(data: string[]): number {
    if (!data || !data[0]) {
        throw new Error('Invalid input data provided!')
    }

    // Parsing stage
    const freshRanges = parseRanges(data[0])

    if (!freshRanges?.length) {
        return 0
    }

    let freshCount = 0

    // Sorting fixes the special case where a previous range in the list can bisect the current one
    freshRanges.sort((firstRange, secondRange) => firstRange[0] - secondRange[0])

    for (let rangeIndex = 0; rangeIndex < freshRanges.length; rangeIndex++) {
        let start = freshRanges[rangeIndex]![0]
        let end = freshRanges[rangeIndex]![1]

        let invalidRange = false

        for (let candidateIndex = 0; candidateIndex < rangeIndex; candidateIndex++) {
            let startCandidate = freshRanges[candidateIndex]![0]
            let endCandidate = freshRanges[candidateIndex]![1]

            // Full overlap with a previous range - Everything gets discarded
            if (start >= startCandidate && end <= endCandidate) {
                // console.log(`Discarding ${start}-${end} because it's already covered by ${startCandidate}-${endCandidate}`);

                invalidRange = true
                break
            }

            // Partial overlap between start of current range and end of a previous range - Lower end gets discarded
            if (start >= startCandidate && start <= endCandidate) {
                start = endCandidate + 1

                if (end < start) {
                    console.log(`Discarding ${start}-${end} because the range is now invalid`)
                    invalidRange = true
                    break
                }
            }
        }

        if (invalidRange) {
            continue
        }

        freshCount += end - start + 1
    }

    return freshCount
}
