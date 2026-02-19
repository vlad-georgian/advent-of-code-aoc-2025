export type Junction = [number, number, number]
export type Connection = {
    start: Junction
    end: Junction
    distance: number
}

export function euclideanDistance(a: Junction, b: Junction) {
    /*
     * Alright so the original Euclidean distance formula uses sqrt(), but that can be expensive,
     * so... I'm skipping it because I'm only interested in sorting the results
     */
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
}

export function parseConnectionsBF(lines: string[]) {
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
