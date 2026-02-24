import { adjacentRollLimit, getRollsAroundItem } from './shared.ts'

export function partTwo(diagram: string[][]): number {
    if (!diagram?.length) {
        throw new Error('No diagram provided')
    }

    const rowCount = diagram.length
    const columnCount = diagram[0]!.length
    let accessibleCount = 0

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            // Uncomment if you want to visualize each step

            // if (diagram[rowIndex]![columnIndex] === 'x') {
            //     diagram[rowIndex]![columnIndex] = '.'
            // }

            if (diagram[rowIndex]![columnIndex] !== '@') {
                continue
            }

            const rollsCount = getRollsAroundItem(diagram, rowIndex, columnIndex)

            if (rollsCount >= adjacentRollLimit) {
                continue
            }

            diagram[rowIndex]![columnIndex] = '.'

            // Uncomment if you want to visualize each step
            // diagram[rowIndex]![columnIndex] = 'x'

            accessibleCount++
        }
    }

    if (accessibleCount === 0) {
        return 0
    }

    const secondRunCount = partTwo(diagram)

    return accessibleCount + secondRunCount
}
