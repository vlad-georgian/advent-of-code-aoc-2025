function getRollsAroundItem(diagram: string[][], i: number, j: number): number {
    let rollCount = 0;
    const rowCount = diagram.length
    const columnCount = diagram[ 0 ].length

    const check = (item: string): boolean => [ '@', "x" ].includes(item)

    if (i > 0) {
        // top row
        rollCount += j > 0 && check(diagram[ i - 1 ][ j - 1 ]) ? 1 : 0
        rollCount += check(diagram[ i - 1 ][ j ]) ? 1 : 0
        rollCount += j < columnCount - 1 && check(diagram[ i - 1 ][ j + 1 ]) ? 1 : 0
    }

    // current row
    rollCount += j > 0 && check(diagram[ i ][ j - 1 ]) ? 1 : 0
    rollCount += j < columnCount - 1 && check(diagram[ i ][ j + 1 ]) ? 1 : 0

    // bottom row
    if (i < rowCount - 1) {
        rollCount += j > 0 && check(diagram[ i + 1 ][ j - 1 ]) ? 1 : 0
        rollCount += check(diagram[ i + 1 ][ j ]) ? 1 : 0
        rollCount += j < columnCount - 1 && check(diagram[ i + 1 ][ j + 1 ]) ? 1 : 0
    }

    return rollCount
}

export function partOne(diagram: string[][]): number {
    if (!diagram?.length) {
        throw new Error('No diagram provided')
    }

    const rowCount = diagram.length
    const columnCount = diagram[ 0 ].length
    let accessibleCount = 0;

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            if (diagram[ i ][ j ] !== '@') {
                continue
            }

            const rollsCount = getRollsAroundItem(diagram, i, j)

            if (rollsCount >= 4) {
                continue
            }

            diagram[ i ][ j ] = 'x'

            accessibleCount++
        }
    }

    return accessibleCount
}

export function partTwo(diagram: string[][]): number {
    if (!diagram?.length) {
        throw new Error('No diagram provided')
    }

    const rowCount = diagram.length
    const columnCount = diagram[ 0 ].length
    let accessibleCount = 0;

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            if (diagram[ i ][ j ] === 'x') { diagram[ i ][ j ] = '.' }
            if (diagram[ i ][ j ] !== '@') {
                continue
            }

            const rollsCount = getRollsAroundItem(diagram, i, j)

            if (rollsCount >= 4) {
                continue
            }

            diagram[ i ][ j ] = 'x'

            accessibleCount++
        }
    }

    if (accessibleCount === 0) {
        return 0
    }

    const secondRunCount = partTwo(diagram)

    return accessibleCount + secondRunCount
}

export function parse(input: string): string[][] {
    return input.toString().trim().split('\r\n').map((row: string): string[] => row.split(''))
}

export function* solve(input: string): Generator<[ string, string, number ]> {
    yield [ 'Day 4: Printing department - Part 1', 'Max accessible', partOne(parse(input)) ]

    return [ 'Day 4: Printing department - Part 2', 'Max accessible', partTwo(parse(input)) ]
}
