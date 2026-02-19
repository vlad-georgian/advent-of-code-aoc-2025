import type { Tile } from '../shared.ts'

// Method: brute force O(n^2)
export function partOne(lines: string[]): number {
    if (!lines) {
        throw new Error('No tiles provided')
    }

    const tiles: Tile[] = []
    let largestRectangleArea = 0

    for (const line of lines) {
        const coords = line.split(',').map(Number)

        if (coords[0] === undefined || coords[1] === undefined) {
            throw new Error(`Invalid coords: ${line}`)
        }

        const tileNew: Tile = { col: coords[0], row: coords[1] }

        for (const tile of tiles) {
            const area = (Math.abs(tile.row - tileNew.row) + 1) * (Math.abs(tile.col - tileNew.col) + 1)

            if (area <= largestRectangleArea) {
                continue
            }

            largestRectangleArea = area
        }

        tiles.push(tileNew)
    }

    return largestRectangleArea
}
