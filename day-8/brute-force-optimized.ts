type Junction = [number, number, number]
type Connection = {
    start: Junction
    end: Junction
    distance: number
}

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

/*
 * Helper method that adds connected junctions to circuits.
 * It returns the resulting circuit count delta. If a circuit was added, returns 1. If it was removed, then -1.
 */
function addConnectionToCircuit(connection: Connection, circuits: Set<Junction>[], junctionCircuitsIndexes: Map<Junction, number>): number {
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

function partOne(lines: string[], connectionLimit = 10, circuitLimit = 3) {
    if (!lines) {
        throw new Error('No junctions provided')
    }

    const connectionsShortest = parseConnections(lines).slice(0, connectionLimit)
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

function partTwo(lines: string[]): number {
    if (!lines) {
        throw new Error('No junctions provided')
    }

    const connectionsShortest = parseConnections(lines)
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

export { partOne, partTwo }
