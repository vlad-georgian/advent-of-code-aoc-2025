import { parseConnectionsBF, type Junction } from '../shared.ts'
import { addConnectionToCircuit } from './shared.ts'

export function partOne(lines: string[], connectionLimit = 10, circuitLimit = 3) {
    if (!lines) {
        throw new Error('No junctions provided')
    }

    const connectionsShortest = parseConnectionsBF(lines).slice(0, connectionLimit)
    const circuits: Set<Junction>[] = []
    const junctionCircuitsIndexes: Map<Junction, number> = new Map()

    // Establish the list of circuits
    for (const connectionShortest of connectionsShortest) {
        const junctionStartCircuitIndex = junctionCircuitsIndexes.get(connectionShortest.start)
        const junctionEndCircuitIndex = junctionCircuitsIndexes.get(connectionShortest.end)

        // Skip junctions that are already in a single circuit
        if (junctionStartCircuitIndex === junctionEndCircuitIndex && junctionStartCircuitIndex !== undefined) {
            continue
        }

        addConnectionToCircuit(connectionShortest, circuits, junctionCircuitsIndexes)
    }

    circuits.sort((firstCircuit, secondCircuit) => secondCircuit.size - firstCircuit.size)

    // Get the result
    let result: number = 1
    let limit = Math.min(circuitLimit, circuits.length)
    for (let circuitIndex = 0; circuitIndex < limit; circuitIndex++) {
        result *= circuits[circuitIndex]?.size || 0
    }

    return result
}
