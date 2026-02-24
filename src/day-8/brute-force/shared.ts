import { type Junction } from '../shared.ts'

export type SearchResult = { circuitIndex: number; foundIndex: number }

export function addConnectionToCircuit(connection: Junction[], circuits: Junction[][], searchResults: SearchResult[]) {
    switch (searchResults.length) {
        case 0: // Create a new circuit if none of the junctions are found in the existing circuits
            circuits.push(connection)

            break
        case 1: // If a junction already exists in a SINGLE circuit, add the other junction to it
            const junctionMissing = searchResults[0]!.foundIndex === 0 ? connection[1]! : connection[0]!
            circuits[searchResults[0]!.circuitIndex]!.push(junctionMissing)

            break
        case 2: // If the junctions exist in different circuits, then merge those circuits
            const firstCircuit = circuits[searchResults[0]!.circuitIndex]
            const secondCircuit = circuits[searchResults[1]!.circuitIndex]
            firstCircuit!.push(...secondCircuit!)

            // "Kill the spare"
            circuits.splice(searchResults[1]!.circuitIndex, 1)

            break
        default:
            throw new Error('A connection was found in more than 2 circuits')
    }
}

export function findConnectionInCircuit(searchFor: Junction[], circuit: [number, Junction[]]): SearchResult[] {
    let searchResultsCircuit: SearchResult[] = []

    for (const junction of circuit[1]) {
        // Optimization: A junction can only show up at max once in a circuit
        if (searchResultsCircuit.length === 2) {
            break
        }

        const foundIndex = searchFor.indexOf(junction)

        if (foundIndex === -1) {
            continue
        }

        searchResultsCircuit.push({ circuitIndex: circuit[0], foundIndex })
    }

    return searchResultsCircuit
}
