import { partOne as partOneBruteOptimized } from './brute-force-optimized/part-one.ts'
import { partTwo as partTwoBruteOptimized } from './brute-force-optimized/part-two.ts'
import { partOne as partOneBrute } from './brute-force/part-one.ts'
import { partTwo as partTwoBrute } from './brute-force/part-two.ts'
import { partOne as partOneDisjointSet } from './disjoint-set/part-one.ts'
import { partTwo as partTwoDisjointSet } from './disjoint-set/part-two.ts'

export function parse(input: string) {
    return input.toString().trimEnd().split('\r\n')
}

export function* solve(input: string, optimal?: boolean, dataset?: 'sample' | 'input'): Generator<(string | number)[]> {
    const data = parse(input)
    const connectionLimit = dataset === 'sample' ? 10 : 1000

    // Part 1 solutions. Optimal solution is usually the "brute force optimized" approach
    if (!optimal) {
        yield ['Day 8: Playground - Part 1 (Brute force)', 'Result', partOneBrute(data, connectionLimit, 3)]
    }

    yield ['Day 8: Playground - Part 1 (Brute force - Optimized)', 'Result', partOneBruteOptimized(data, connectionLimit, 3)]

    if (!optimal) {
        yield ['Day 8: Playground - Part 1 (Disjoint set)', 'Result', partOneDisjointSet(data, connectionLimit, 3)]
    }

    // Part 2 solutions. Optimal solution is usually the "disjoint set" approach
    if (!optimal) {
        yield ['Day 8: Playground - Part 2 (Brute force)', 'Result', partTwoBrute(data)]
        yield ['Day 8: Playground - Part 2 (Brute force - Optimized)', 'Result', partTwoBruteOptimized(data)]
    }

    return ['Day 8: Playground - Part 2 (Disjoint set)', 'Result', partTwoDisjointSet(data)]
}
