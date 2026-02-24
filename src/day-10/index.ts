import { partOne as partOneBFS } from './bfs/part-one.ts'
import { partOne as partOneBrute } from './brute-force/part-one-brute-force.ts'
import { runPartTwoTask } from './z3/part-two-harness.ts'

export function parse(input: string) {
    return input.toString().trimEnd().split('\r\n')
}

export async function* solve(input: string, optimal?: boolean): AsyncGenerator<(string | number)[]> {
    const data = parse(input)

    let cacheRate: string

    // Part one solutions
    if (!optimal) {
        let resultBrute = partOneBrute(data)
        cacheRate = ((resultBrute.cacheHits * 100) / resultBrute.iterations).toFixed(2)
        yield [
            'Day 10: Factory - Part 1 (Brute force)',
            'Result',
            resultBrute.result,
            `(Iterations: ${resultBrute.iterations}, Cached: ${resultBrute.cacheHits} ${cacheRate}%)`,
        ]
    }

    let resultBFS = partOneBFS(data)
    cacheRate = ((resultBFS.cacheHits * 100) / resultBFS.iterations).toFixed(2)
    yield ['Day 10: Factory - Part 1 (BFS)', 'Result', resultBFS.result, `(Iterations: ${resultBFS.iterations}, Cached: ${resultBFS.cacheHits} ${cacheRate}%)`]

    // Part two solutions
    try {
        return ['Day 10: Factory - Part 2 (Z3)', 'Result', await runPartTwoTask(data)]
    } catch (e) {
        console.error(
            'Current Z3 implementation throws WASM errors under some environments (eg. Bun).',
            `Force it to run under Node using 'npm run start:node'`,
        )

        if (e instanceof Error) {
            console.error(`Error: ${e.message}`)
        }

        return ['Day 10: Factory - Part 2 (Z3)', 'Result', 'N/A']
    }
}
