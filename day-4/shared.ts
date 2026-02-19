export const adjacentRollLimit = 4

export function getRollsAroundItem(diagram: string[][], row: number, column: number): number {
    if (!diagram[0]) {
        throw new Error('Invalid diagram shape!')
    }

    if (diagram?.length < row || diagram[0].length < column) {
        throw new Error(`The diagram does now contain the specified position: ${row}-${column}`)
    }

    let rollCount = 0
    const rowCount = diagram.length
    const columnCount = diagram[0].length

    const isRollOfPaper = (item: string): boolean => ['@', 'x'].includes(item)

    // Top row
    if (row > 0) {
        rollCount += column > 0 && isRollOfPaper(diagram[row - 1]![column - 1]!) ? 1 : 0
        rollCount += isRollOfPaper(diagram[row - 1]![column]!) ? 1 : 0
        rollCount += column < columnCount - 1 && isRollOfPaper(diagram[row - 1]![column + 1]!) ? 1 : 0
    }

    // Current row
    rollCount += column > 0 && isRollOfPaper(diagram[row]![column - 1]!) ? 1 : 0
    rollCount += column < columnCount - 1 && isRollOfPaper(diagram[row]![column + 1]!) ? 1 : 0

    // Bottom row
    if (row < rowCount - 1) {
        rollCount += column > 0 && isRollOfPaper(diagram[row + 1]![column - 1]!) ? 1 : 0
        rollCount += isRollOfPaper(diagram[row + 1]![column]!) ? 1 : 0
        rollCount += column < columnCount - 1 && isRollOfPaper(diagram[row + 1]![column + 1]!) ? 1 : 0
    }

    return rollCount
}
