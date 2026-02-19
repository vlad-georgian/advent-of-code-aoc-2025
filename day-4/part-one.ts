import { adjacentRollLimit, getRollsAroundItem } from './shared.ts'

export function partOne(diagram: string[][]): number {
    if (!diagram?.length) {
        throw new Error('No diagram provided')
    }

    if (!diagram[0]) {
        throw new Error('Invalid diagram shape!')
    }

    const rowCount = diagram.length
    const columnCount = diagram[0].length
    let accessibleCount = 0

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            if (diagram[rowIndex]![columnIndex] !== '@') {
                continue
            }

            const rollsCount = getRollsAroundItem(diagram, rowIndex, columnIndex)

            if (rollsCount >= adjacentRollLimit) {
                continue
            }

            diagram[rowIndex]![columnIndex] = 'x'

            accessibleCount++
        }
    }

    return accessibleCount
}
