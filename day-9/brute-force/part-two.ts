import type { Direction, Rectangle, Tile } from '../shared.ts'
import type { Edge } from './shared.ts'

/*
 * Helper method for part 2 that builds polygon borders and assigns a valid "inside" side for each edge
 * The "inside" side is marked from the perspective of the edge vector itself, NOT based the screen or coords system
 * As such, it is always consistent: "right" side for polygons that are defined clockwise and "left" side for counter-clockwise ones
 */
function buildContainingPolygon(tiles: Tile[]): Edge[] {
    const edges: Edge[] = []

    // First, build all edges with directions
    let signedArea = 0
    for (let tileIndex = 0; tileIndex < tiles.length; tileIndex++) {
        const start = tiles[tileIndex]!
        const end = tiles[(tileIndex + 1) % tiles.length]!

        signedArea += start.col * end.row - end.col * start.row

        const direction: Direction = start.col === end.col ? (start.row < end.row ? 'down' : 'up') : start.col < end.col ? 'right' : 'left'

        edges.push({ start, end, direction, validSide: undefined })
    }

    const clockwise = signedArea > 0

    // Valid "inside" sides are assigned based on the polygon winding direction
    for (const edge of edges) {
        edge.validSide = clockwise ? 'right' : 'left'
    }

    return edges
}

/*
 * Helper method for part 2 that checks both:
 * - if there's an edge going through the rectangle
 * - if there's any edges directly on the border that have their "green" size in the opposite direction
 */
function isRectangleOutside(rectangle: Rectangle, edges: Edge[]): boolean {
    // Compute the real top-left and bottom-right corners
    const cornerMin: Tile = {
        col: Math.min(rectangle.cornerA.col, rectangle.cornerB.col),
        row: Math.min(rectangle.cornerA.row, rectangle.cornerB.row),
    }
    const cornerMax: Tile = {
        col: Math.max(rectangle.cornerA.col, rectangle.cornerB.col),
        row: Math.max(rectangle.cornerA.row, rectangle.cornerB.row),
    }

    let discard = false

    // Check if any of the edges cuts through, or if they have the rectangle on the wrong side
    for (const edge of edges) {
        // Horizontal edges checks
        if (edge.direction === 'left' || edge.direction === 'right') {
            // Edge cut-through check
            const isOriginInContentBox = edge.start.row > cornerMin.row && edge.start.row < cornerMax.row
            const isEdgeLeftOfBoxRightEdge = Math.min(edge.start.col, edge.end.col) < cornerMax.col
            const isEdgeRightOfBoxLeftEdge = Math.max(edge.start.col, edge.end.col) > cornerMin.col

            if (isOriginInContentBox && isEdgeLeftOfBoxRightEdge && isEdgeRightOfBoxLeftEdge) {
                discard = true
                break
            }

            // Valid side check
            const isEdgeOnTopBorderColumn = cornerMin.row === edge.start.row
            const isEdgeOnBottomBorderColumn = cornerMax.row === edge.start.row

            // IMPORTANT! Strict checks ensures edges going away from the rectangle are ignored
            const isEdgeInsideBorder = edge.start.col < cornerMax.col && edge.end.col > cornerMin.col

            const isTopBorderOnWrongSide = isEdgeOnTopBorderColumn && isEdgeInsideBorder && edge.validSide !== (edge.direction === 'left' ? 'left' : 'right')
            const isBottomBorderOnWrongSide =
                isEdgeOnBottomBorderColumn && isEdgeInsideBorder && edge.validSide !== (edge.direction === 'left' ? 'right' : 'left')

            if (isTopBorderOnWrongSide || isBottomBorderOnWrongSide) {
                discard = true
                break
            }
        }
        // Vertical edge checks
        else {
            // Edge cut-through check
            const isOriginInContentBox = edge.start.col > cornerMin.col && edge.start.col < cornerMax.col
            const isEdgeAboveBoxBottom = Math.min(edge.start.row, edge.end.row) < cornerMax.row
            const isEdgeBelowBoxTop = Math.max(edge.start.row, edge.end.row) > cornerMin.row

            if (isOriginInContentBox && isEdgeAboveBoxBottom && isEdgeBelowBoxTop) {
                discard = true
                break
            }

            // Valid side check
            const isEdgeOnLeftBorderColumn = cornerMin.col === edge.start.col
            const isEdgeOnRightBorderColumn = cornerMax.col === edge.start.col

            // IMPORTANT! Strict checks ensures edges going away from the rectangle are ignored
            const isEdgeInsideBorder = edge.start.row < cornerMax.row && edge.end.row > cornerMin.row

            const isLeftBorderOnWrongSide = isEdgeOnLeftBorderColumn && isEdgeInsideBorder && edge.validSide !== (edge.direction === 'up' ? 'right' : 'left')
            const isRightBorderOnWrongSide = isEdgeOnRightBorderColumn && isEdgeInsideBorder && edge.validSide !== (edge.direction === 'up' ? 'left' : 'right')

            if (isLeftBorderOnWrongSide || isRightBorderOnWrongSide) {
                discard = true
                break
            }
        }
    }

    return discard
}

/*
 * Method: IDK if this has a name, but basically brute force; O(n^2) with way to many loops though
 */
export function partTwo(lines: string[]): number {
    if (!lines) {
        throw new Error('No tiles provided')
    }

    const tiles: Tile[] = []
    const rectangleCandidates: Rectangle[] = []

    // Build list of candidates
    for (const line of lines) {
        const coords = line.split(',').map(Number)

        if (coords[0] === undefined || coords[1] === undefined) {
            throw new Error(`Invalid coords: ${line}`)
        }

        const tileNew: Tile = { col: coords[0], row: coords[1] }

        for (const tile of tiles) {
            const area = (Math.abs(tile.row - tileNew.row) + 1) * (Math.abs(tile.col - tileNew.col) + 1)
            rectangleCandidates.push({ cornerA: tileNew, cornerB: tile, area })
        }

        tiles.push(tileNew)
    }

    rectangleCandidates.sort((rectangleA, rectangleB) => rectangleB.area - rectangleA.area)

    // Build polygon
    const edges: Edge[] = buildContainingPolygon(tiles)

    // Check candidates against polygon
    let largestRectangle: Rectangle | undefined

    for (const rectangle of rectangleCandidates) {
        if (isRectangleOutside(rectangle, edges)) {
            continue
        }

        largestRectangle = rectangle

        break
    }

    if (!largestRectangle) {
        return 0
    }

    return largestRectangle.area
}
