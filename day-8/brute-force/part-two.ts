import { parseConnectionsBF, type Junction } from '../shared.ts'
import { addConnectionToCircuit, findConnectionInCircuit, type SearchResult } from './shared.ts'

export function partTwo(lines: string[]): number {
    if (!lines) {
        throw new Error('No junctions provided')
    }

    const connectionsShortest = parseConnectionsBF(lines)
    const circuits: Junction[][] = []
    let lastConnection: Junction[] = []

    // Establish the list of circuits
    for (const connectionShortest of connectionsShortest) {
        const searchFor = [connectionShortest.start, connectionShortest.end]
        const searchResults: SearchResult[] = []
        let alreadyInACircuit = false

        // Find all the existing circuits that include the new junctions.
        for (const [circuitIndex, circuit] of circuits.entries()) {
            let searchResultsCircuit: SearchResult[] = findConnectionInCircuit(searchFor, [circuitIndex, circuit])

            // Only consider this circuit if one of the junctions was found in it
            if (searchResultsCircuit.length === 1) {
                searchResults.push(...searchResultsCircuit)
                continue
            } else if (searchResultsCircuit.length === 2) {
                alreadyInACircuit = true
                break
            }
        }

        if (alreadyInACircuit) {
            // console.log('same circuit', circuits.length, connectionShortest)
            continue
        }

        addConnectionToCircuit(searchFor, circuits, searchResults)

        // Store the last junction that can be added while keeping one single circuit
        if (circuits.length === 1) {
            lastConnection = searchFor
        }
    }

    if (!lastConnection.length) {
        throw new Error('Failed to find the connection that creates a single circuit!')
    }

    return Number(lastConnection[0]![0]) * Number(lastConnection[1]![0])
}
