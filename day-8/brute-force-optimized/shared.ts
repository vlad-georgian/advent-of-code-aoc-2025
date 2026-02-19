import type { Connection, Junction } from '../shared.ts'

/*
 * Helper method that adds connected junctions to circuits.
 * It returns the resulting circuit count delta. If a circuit was added, returns 1. If it was removed, then -1.
 */
export function addConnectionToCircuit(connection: Connection, circuits: Set<Junction>[], junctionCircuitsIndexes: Map<Junction, number>): number {
    const junctionStartCircuitIndex = junctionCircuitsIndexes.get(connection.start)
    const junctionEndCircuitIndex = junctionCircuitsIndexes.get(connection.end)

    switch ([typeof junctionStartCircuitIndex, typeof junctionEndCircuitIndex].join('-')) {
        case 'number-number':
            const circuitStart = circuits[junctionStartCircuitIndex!]!
            const circuitEnd = circuits[junctionEndCircuitIndex!]!

            if (circuitStart.size > circuitEnd.size) {
                circuits[junctionStartCircuitIndex!] = circuitStart?.union(circuitEnd)
                circuitEnd.forEach((j) => junctionCircuitsIndexes.set(j, junctionStartCircuitIndex!))
                circuitEnd.clear()
            } else {
                circuits[junctionEndCircuitIndex!] = circuitEnd?.union(circuitStart)
                circuitStart.forEach((j) => junctionCircuitsIndexes.set(j, junctionEndCircuitIndex!))
                circuitStart.clear()
            }

            return -1
        case 'undefined-undefined': // Create a new circuit if none of the junctions are found in the existing circuits
            circuits.push(new Set([connection.start, connection.end]))

            junctionCircuitsIndexes.set(connection.start, circuits.length - 1)
            junctionCircuitsIndexes.set(connection.end, circuits.length - 1)

            return 1
        case 'number-undefined': // If the start junction already exists in a circuit, then also add the other junction
            circuits[junctionStartCircuitIndex!]!.add(connection.end)
            junctionCircuitsIndexes.set(connection.end, junctionStartCircuitIndex!)
            return 0
        case 'undefined-number': // If the end junction already exists in a circuit, then also add the other junction
            circuits[junctionEndCircuitIndex!]!.add(connection.start)
            junctionCircuitsIndexes.set(connection.start, junctionEndCircuitIndex!)
            return 0
        default:
            throw new Error(`Invalid state while processing connection: ${connection.start}-${connection.end}`)
    }
}
