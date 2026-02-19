import { DisjointSet, parseConnectionsDS } from './shared.ts'

export function partOne(lines: string[], connectionLimit = 10, circuitLimit = 3): number {
    if (!lines) {
        throw new Error('No junctions provided')
    }

    const connectionsShortest = parseConnectionsDS(lines).slice(0, connectionLimit)
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
