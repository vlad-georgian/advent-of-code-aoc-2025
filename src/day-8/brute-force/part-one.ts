import { parseConnectionsBF, type Junction } from '../shared.ts'
import { addConnectionToCircuit, findConnectionInCircuit, type SearchResult } from './shared.ts'

export function partOne(lines: string[], connectionLimit = 10, circuitLimit = 3) {
    if (!lines) {
        throw new Error('No junctions provided')
    }

    const connectionsShortest = parseConnectionsBF(lines).slice(0, connectionLimit)
    const circuits: Junction[][] = []

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
                searchResults.push(searchResultsCircuit[0]!)
            } else if (searchResultsCircuit.length === 2) {
                alreadyInACircuit = true
                break
            }
        }

        if (alreadyInACircuit) {
            continue
        }

        addConnectionToCircuit(searchFor, circuits, searchResults)
    }

    circuits.sort((firstCircuit, secondCircuit) => secondCircuit.length - firstCircuit.length)

    // Get the result
    let result: number = 1
    let limit = Math.min(circuitLimit, circuits.length)

    for (let circuitIndex = 0; circuitIndex < limit; circuitIndex++) {
        result *= circuits[circuitIndex]!.length
    }

    return result
}
