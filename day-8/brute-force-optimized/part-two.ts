import { parseConnectionsBF, type Junction } from '../shared.ts'
import { addConnectionToCircuit } from './shared.ts'

export function partTwo(lines: string[]): number {
    if (!lines) {
        throw new Error('No junctions provided')
    }

    const connectionsShortest = parseConnectionsBF(lines)
    const circuits: Set<Junction>[] = []
    const junctionCircuitsIndexes: Map<Junction, number> = new Map()

    let activeCircuits: number = 0
    let lastConnection: Junction[] = []

    // Establish the list of circuits
    for (const connectionShortest of connectionsShortest) {
        const junctionStartCircuitIndex = junctionCircuitsIndexes.get(connectionShortest.start)
        const junctionEndCircuitIndex = junctionCircuitsIndexes.get(connectionShortest.end)

        // Skip junctions that are already in a single circuit
        if (junctionStartCircuitIndex === junctionEndCircuitIndex && junctionStartCircuitIndex !== undefined) {
            continue
        }

        const junctionsDelta = addConnectionToCircuit(connectionShortest, circuits, junctionCircuitsIndexes)
        activeCircuits += junctionsDelta

        // Store the last junction that can be added while keeping one single circuit
        if (activeCircuits !== 1) {
            continue
        }

        lastConnection = [connectionShortest.start, connectionShortest.end]
    }

    if (!lastConnection.length) {
        throw new Error('Failed to find the connection that creates a single circuit!')
    }

    return Number(lastConnection[0]![0]) * Number(lastConnection[1]![0])
}
