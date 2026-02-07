type Junction = [number, number, number]
type Connection = {
    startJunctionIndex: number
    endJunctionIndex: number
    distance: number
}

/*
 * Helper class for performing union find
 * Disjoint set lore: https://www.geeksforgeeks.org/dsa/introduction-to-disjoint-set-data-structure-or-union-find-algorithm/
 * Path compression lore + union by rank/size: https://www.geeksforgeeks.org/dsa/union-by-rank-and-path-compression-in-union-find-algorithm/
 */
class DisjointSet {
    private circuitParents: number[]
    private circuitSizes: number[]

    constructor(size: number) {
        this.circuitParents = Array.from({ length: size }).map((_, index) => index)
        this.circuitSizes = Array.from<number>({ length: size }).fill(1)
    }

    findParent(junctionIndex: number): number {
        let junctionParentIndex = junctionIndex

        // Search in the subtree for the root of the circuit
        while (this.circuitParents[junctionParentIndex] !== junctionParentIndex) {
            junctionParentIndex = this.circuitParents[junctionParentIndex]!
        }

        // Optimization step to compress the size of the tree going forward - basically: memoization
        this.compress(junctionIndex, junctionParentIndex)

        return junctionParentIndex
    }

    unite(junctionIndexA: number, junctionIndexB: number): boolean {
        const circuitRootA = this.findParent(junctionIndexA)
        const circuitRootB = this.findParent(junctionIndexB)

        // Skip if the junctions are already part of the same circuit
        if (circuitRootA === circuitRootB) {
            return false
        }

        // Union by size
        const smallerCircuitIndex = this.circuitSizes[circuitRootA]! < this.circuitSizes[circuitRootB]! ? circuitRootA : circuitRootB
        const biggerCircuitIndex = smallerCircuitIndex === circuitRootA ? circuitRootB : circuitRootA

        this.circuitParents[smallerCircuitIndex] = biggerCircuitIndex
        this.circuitSizes[biggerCircuitIndex]! += this.circuitSizes[smallerCircuitIndex]!

        return true
    }

    getCircuitSize(index: number): number {
        return this.circuitSizes[this.findParent(index)]!
    }

    private compress(index: number, parentIndex: number) {
        let currentIndex = index

        // Updates every element to have the root of the circuit set as the parent
        while (this.circuitParents[currentIndex] !== parentIndex) {
            const nextIndex = this.circuitParents[currentIndex]!
            this.circuitParents[currentIndex] = parentIndex
            currentIndex = nextIndex
        }
    }
}

function euclideanDistance(a: Junction, b: Junction) {
    /*
     * Alright so the original Euclidean distance formula uses sqrt(), but that can be expensive,
     * so... I'm skipping it because I'm only interested in sorting the results
     */
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
}

function parseConnections(lines: string[]): Connection[] {
    const junctions: Junction[] = []
    let connectionsShortest: Connection[] = []

    // Establish the list of connections
    for (const [firstJunctionIndex, line] of lines.entries()) {
        const firstJunction: Junction = line.split(',').map(Number) as [number, number, number]

        if (firstJunction.some((v) => Number.isNaN(v))) {
            throw new Error(`Invalid junction ${line}`)
        }

        for (const [secondJunctionIndex, secondJunction] of junctions.entries()) {
            connectionsShortest.push({
                startJunctionIndex: firstJunctionIndex,
                endJunctionIndex: secondJunctionIndex,
                distance: euclideanDistance(firstJunction, secondJunction),
            })
        }

        junctions.push(firstJunction)
    }

    // Sort to find the shortest connections
    connectionsShortest = connectionsShortest.sort((a, b) => a.distance - b.distance)

    return connectionsShortest
}

function partOne(lines: string[], connectionLimit = 10, circuitLimit = 3): number {
    if (!lines) {
        throw new Error('No junctions provided')
    }

    const connectionsShortest = parseConnections(lines).slice(0, connectionLimit)
    const disjointSet = new DisjointSet(lines.length)

    // Establish the list of circuits
    let connectionCount = 0

    for (const connectionShortest of connectionsShortest) {
        if (connectionCount === connectionLimit) {
            break
        }

        if (disjointSet.unite(connectionShortest.startJunctionIndex, connectionShortest.endJunctionIndex)) {
            connectionCount++
        }
    }

    // Build the circuit sizes by counting how many times each the circuit root shows up
    const sizeMap = new Map<number, number>()

    for (let junctionIndex = 0; junctionIndex < lines.length; junctionIndex++) {
        const circuitRoot = disjointSet.findParent(junctionIndex)
        sizeMap.set(circuitRoot, (sizeMap.get(circuitRoot) || 0) + 1)
    }

    const biggestCircuits = Array.from(sizeMap).sort((a, b) => b[1] - a[1])

    return biggestCircuits.slice(0, circuitLimit).reduce((product, entry) => product * entry[1], 1)
}

function partTwo(lines: string[]): number {
    if (!lines) {
        throw new Error('No junctions provided')
    }

    const connectionsShortest = parseConnections(lines)
    const disjointSet = new DisjointSet(lines.length)

    // Establish the list of circuits
    const lastPair: string[] = []
    for (const connectionShortest of connectionsShortest) {
        if (!disjointSet.unite(connectionShortest.startJunctionIndex, connectionShortest.endJunctionIndex)) {
            continue
        }

        /*
         * Extra logic for part 2
         * If... after the merge, we ended up with a single circuit,
         * then the current connection is the one we were looking for all along
         */
        if (disjointSet.getCircuitSize(connectionShortest.startJunctionIndex) !== lines.length) {
            continue
        }

        lastPair.push(lines[connectionShortest.startJunctionIndex]!, lines[connectionShortest.endJunctionIndex]!)
        break
    }

    return Number(lastPair[0]!.split(',')[0]) * Number(lastPair[1]!.split(',')[0])
}

export { partOne, partTwo }
