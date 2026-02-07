type Direction = 'left' | 'right' | 'up' | 'down' | undefined
type Tile = { col: number; row: number }
type Rectangle = { cornerA: Tile; cornerB: Tile; area: number }
type Edge = { start: Tile; end: Tile; direction: Direction }

/*
 * Helper method for part 2 that build he polygon borders.
 * This is a bit simpler than the brute force approach since we no longer have to calculate the "valid" side
 */
function buildContainingPolygon(tiles: Tile[]): Edge[] {
    const edges: Edge[] = []

    for (let tileIndex = 0; tileIndex < tiles.length; tileIndex++) {
        const start = tiles[tileIndex]!
        const end = tiles[(tileIndex + 1) % tiles.length]!

        const direction: Direction = start.col === end.col ? (start.row < end.row ? 'down' : 'up') : start.col < end.col ? 'right' : 'left'

        edges.push({ start, end, direction })
    }

    return edges
}

/*
 * Helper method for part 2 that checks crossings between a point and a list of edges
 * Basically involves casting a ray on the +X axis and counting intersections
 */
function pointInPolygon(point: Tile, edges: Edge[]): boolean {
    const verticalEdges: Direction[] = ['up', 'down']

    let crossings = 0

    for (const edge of edges) {
        if (!verticalEdges.includes(edge.direction)) continue

        // Uses half-open interval on Y axis to avoid double counting
        const minRow = Math.min(edge.start.row, edge.end.row)
        const maxRow = Math.max(edge.start.row, edge.end.row)
        if (point.row >= minRow && point.row < maxRow && edge.start.col > point.col) {
            crossings++
        }
    }

    return !!(crossings & 1) // odd -> point is in polygon
}

/*
 * Helper method for part 2 that checks both:
 * - if there's an edge going through the rectangle
 * - if the middle of the rectangle is inside the polygon
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
        }
    }

    if (discard) {
        return discard
    }

    const middle: Tile = {
        col: Math.floor((cornerMin.col + cornerMax.col) / 2),
        row: Math.floor((cornerMin.row + cornerMax.row) / 2),
    }

    return !pointInPolygon(middle, edges)
}

/*
 * Method: Geometric validation; O(n^2)
 */
function partTwo(lines: string[]): number {
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

export { partTwo }
