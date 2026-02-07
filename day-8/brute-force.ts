type Junction = [number, number, number]
type Connection = {
    start: Junction
    end: Junction
    distance: number
}
type SearchResult = { circuitIndex: number; foundIndex: number }

function euclideanDistance(a: Junction, b: Junction) {
    /*
     * Alright so the original Euclidean distance formula uses sqrt(), but that can be expensive,
     * so... I'm skipping it because I'm only interested in sorting the results
     */
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
}

function parseConnections(lines: string[]) {
    const junctions: Junction[] = []
    let connectionsShortest: Connection[] = []

    // Establish the list of connections
    for (const line of lines) {
        const [x, y, z] = line.split(',').map(Number) as [number, number, number]

        if ([x, y, z].some((v) => Number.isNaN(v))) {
            throw new Error(`Invalid junction ${line}`)
        }

        const junction: Junction = [x, y, z]

        for (const previousJunction of junctions) {
            connectionsShortest.push({
                start: junction,
                end: previousJunction,
                distance: euclideanDistance(junction, previousJunction),
            })
        }

        junctions.push(junction)
    }

    connectionsShortest = connectionsShortest.sort((a, b) => a.distance - b.distance)

    return connectionsShortest
}

function addConnectionToCircuit(connection: Junction[], circuits: Junction[][], searchResults: SearchResult[]) {
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

function findConnectionInCircuit(searchFor: Junction[], circuit: [number, Junction[]]): SearchResult[] {
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

function partOne(lines: string[], connectionLimit = 10, circuitLimit = 3) {
    if (!lines) {
        throw new Error('No junctions provided')
    }

    const connectionsShortest = parseConnections(lines).slice(0, connectionLimit)
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

function partTwo(lines: string[]): number {
    if (!lines) {
        throw new Error('No junctions provided')
    }

    const connectionsShortest = parseConnections(lines)
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

export { partOne, partTwo }
