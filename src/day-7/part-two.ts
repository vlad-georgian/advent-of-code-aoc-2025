import { partOne } from './part-one.ts'

type PartTwoResult = {
    result: number
    iterations: number
    cacheHits: number
}

// Method: Top-down dynamic programming. O(n*m)
export function partTwo(lines: string[]): PartTwoResult {
    // Extract the mask from the result for part 1
    const { mask } = partOne(lines)

    const cache: Map<string, number> = new Map()
    let cacheHits: number = 0
    let iterations: number = 0

    // Helper method to help count the cache hits; not relevant to the solution
    const cacheFetch = (key: string): number => {
        cacheHits++
        return cache.get(key)!
    }

    // Helper method that ensure the mask values override the initial data
    const getCellValue = (rowIndex: number, columnIndex: number): string => {
        const key = `${rowIndex}:${columnIndex}`
        return mask.has(key) ? mask.get(key)! : lines[rowIndex]![columnIndex]!
    }

    const dp = (row: number, column: number): number => {
        iterations++

        if (row > lines.length - 1) {
            return 1
        }

        const cellValue = getCellValue(row, column)

        if (['|', 'S'].includes(cellValue)) {
            const newRowKey = `${row + 1}-${column}`

            if (cache.has(newRowKey)) {
                return cacheFetch(newRowKey)!
            }

            const result = dp(row + 1, column)
            cache.set(`${row + 1}-${column}`, result)

            return result
        } else if (cellValue === '^') {
            const leftColumnKey = `${row}-${column - 1}`
            const rightColumnKey = `${row}-${column + 1}`

            const leftResult = cache.has(leftColumnKey) ? cacheFetch(leftColumnKey) : dp(row, column - 1)
            const rightResult = cache.has(rightColumnKey) ? cacheFetch(rightColumnKey) : dp(row, column + 1)

            cache.set(leftColumnKey, leftResult)
            cache.set(rightColumnKey, rightResult)

            return leftResult + rightResult
        }

        throw new Error('invalid state')
    }

    // Find the starting position and compute the result
    for (let columnIndex = 0; columnIndex < lines[0]!.length; columnIndex++) {
        if (lines[0]![columnIndex] !== 'S') {
            continue
        }

        const result = dp(0, columnIndex)

        return { result, iterations, cacheHits }
    }

    throw new Error('Failed to find starting position!')
}
