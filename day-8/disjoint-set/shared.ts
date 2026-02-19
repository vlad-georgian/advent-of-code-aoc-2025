import { euclideanDistance, type Junction } from '../shared.ts'

export type ConnectionDS = {
    startJunctionIndex: number
    endJunctionIndex: number
    distance: number
}

export function parseConnectionsDS(lines: string[]): ConnectionDS[] {
    const junctions: Junction[] = []
    let connectionsShortest: ConnectionDS[] = []

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

/*
 * Helper class for performing union find
 * Disjoint set lore: https://www.geeksforgeeks.org/dsa/introduction-to-disjoint-set-data-structure-or-union-find-algorithm/
 * Path compression lore + union by rank/size: https://www.geeksforgeeks.org/dsa/union-by-rank-and-path-compression-in-union-find-algorithm/
 */
export class DisjointSet {
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
