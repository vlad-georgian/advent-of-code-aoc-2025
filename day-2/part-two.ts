export function partTwo(ranges: string[]): number {
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
            let subdivisionCount = 2
            let isInvalid = false

            while (!isInvalid && subdivisionCount <= currentStr.length) {
                isInvalid = areSubdivisionsEqual(currentStr, subdivisionCount)
                subdivisionCount++
            }

            if (isInvalid) {
                invalidSum += current
            }
        }
    }

    return invalidSum
}

function areSubdivisionsEqual(source: string, subdivisions: number): boolean {
    if (source.length % subdivisions !== 0) {
        return false
    }

    let mainSlice: string | undefined

    for (let subdivisionIndex = 0; subdivisionIndex < subdivisions; subdivisionIndex++) {
        const sliceLength = source.length / subdivisions
        const slice = source.slice(sliceLength * subdivisionIndex, sliceLength * (subdivisionIndex + 1))

        if (mainSlice === undefined) {
            mainSlice = slice
        } else if (mainSlice !== slice) {
            return false
        }
    }

    return true
}
