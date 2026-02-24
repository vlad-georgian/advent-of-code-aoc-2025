import { DisjointSet, parseConnectionsDS } from './shared.ts'

export function partTwo(lines: string[]): number {
    if (!lines) {
        throw new Error('No junctions provided')
    }

    const connectionsShortest = parseConnectionsDS(lines)
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
