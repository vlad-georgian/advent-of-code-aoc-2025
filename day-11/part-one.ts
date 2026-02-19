import type { Result } from './shared.ts'

/*
 * Method: DFS over a DAG with memoization(DP). O(V*E)
 * Lore: https://www.geeksforgeeks.org/dsa/number-of-paths-from-source-to-destination-in-a-directed-acyclic-graph/
 */
export function partOne(lines: string[], startNode = 'you', endNode = 'out'): Result {
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
    const dfs = (node: string): number => {
        iterations++

        if (memo.has(node)) {
            cacheHits++

            return memo.get(node)!
        }

        if (node === endNode) {
            return 1
        }

        let subtotal = 0
        const edges = graph.get(node) || []

        for (const edge of edges) {
            subtotal += dfs(edge)
        }

        memo.set(node, subtotal)

        return subtotal
    }

    return { result: dfs(startNode), iterations, cacheHits }
}
