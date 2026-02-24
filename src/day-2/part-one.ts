export function partOne(ranges: string[]): number {
    if (!ranges?.length) {
        throw new Error('Invalid ranges provided')
    }

    let invalidSum = 0

    for (const range of ranges) {
        const [rangeStart, rangeEnd] = range.trim().split('-').map(Number)

        if (rangeStart === undefined || Number.isNaN(rangeStart)) {
            throw new Error(`Invalid starting number provided for range: ${rangeStart}-${rangeEnd}`)
        }

        if (rangeEnd === undefined || Number.isNaN(rangeEnd)) {
            throw new Error(`Invalid ending number provided for range: ${rangeStart}-${rangeEnd}`)
        }

        for (let current = rangeStart; current <= rangeEnd; current++) {
            const currentStr = current.toString()

            if (currentStr.length % 2) {
                continue
            }

            const left = currentStr.slice(0, currentStr.length / 2)
            const right = currentStr.slice(currentStr.length / 2, currentStr.length)

            if (left === right) {
                invalidSum += current
            }
        }
    }

    return invalidSum
}
