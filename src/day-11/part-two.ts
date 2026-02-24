import type { Result } from './shared.ts'

/*
 * Method: Same as part 1, DFS over a DAG with memoization(DP). O(V*E)
 * However, now a node can have varying amount of valid paths, depending on how many
 * mandatory nodes were visited, so it's important to memo each state separately
 * Lore: https://www.geeksforgeeks.org/dsa/number-of-paths-from-source-to-destination-in-a-directed-acyclic-graph/
 */
export function partTwo(lines: string[], mandatoryNodes: string[], startNode = 'svr', endNode = 'out'): Result {
    if (!lines?.length) {
        throw new Error('No data provided')
    }

    // Graph build stage
    const graph: Map<string, string[]> = new Map()

    for (const line of lines) {
        const parts = line.split(':')

        if (parts.length !== 2) {
            throw new Error(`Invalid line: ${line}`)
        }

        const value = parts[0]!.trim()
        const edges = parts[1]!.trim().split(' ')

        graph.set(value, edges)
    }

    if (!graph.has(startNode)) {
        throw new Error('Failed to find starting node!')
    }

    const memo: Map<string, number> = new Map()
    let cacheHits = 0
    let iterations = 0

    // DFS stage
    const dfs = (node: string, mandatoryNodesVisited: boolean[]): number => {
        iterations++

        // Depending on the mandatory nodes that were already visited, we can have different sets of valid paths
        const cacheKey = `${node}${mandatoryNodesVisited.reduce((acc, status) => `${acc}-${Number(status)}`, '')}`

        if (memo.has(cacheKey)) {
            cacheHits++

            return memo.get(cacheKey)!
        }

        // Mark visited mandatory nodes
        const mandatoryNodesVisitedUpdated = [...mandatoryNodesVisited]
        const mandatoryNodeFoundIndex = mandatoryNodes.indexOf(node)

        if (mandatoryNodeFoundIndex !== -1) {
            mandatoryNodesVisitedUpdated[mandatoryNodeFoundIndex] = true
        }

        // Check if all mandatory nodes are visited
        const areAllMandatoryNodesVisited = !mandatoryNodesVisitedUpdated.some((value) => !value)

        let subtotal = 0
        const edges = graph.get(node) || []

        for (const edge of edges) {
            if (edge !== endNode) {
                subtotal += dfs(edge, mandatoryNodesVisitedUpdated)
                continue
            }

            // Ensures reaching "out" only counts if all the mandatory nodes were visited
            if (areAllMandatoryNodesVisited) {
                subtotal++
            }
        }

        memo.set(cacheKey, subtotal)

        return subtotal
    }

    const result = dfs(startNode, Array.from<boolean>({ length: mandatoryNodes.length }).fill(false))

    return { result, iterations, cacheHits }
}
