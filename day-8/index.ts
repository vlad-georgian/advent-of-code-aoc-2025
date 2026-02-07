import { partOne as partOneBruteOptimized, partTwo as partTwoBruteOptimized } from './brute-force-optimized.js'
import { partOne as partOneBrute, partTwo as partTwoBrute } from './brute-force.js'
import { partOne as partOneDisjointSet, partTwo as partTwoDisjointSet } from './disjoint-set.js'

function parse(input: string) {
    return input.toString().trimEnd().split('\r\n')
}

function* solve(input: string, dataset?: 'sample' | 'input'): Generator<(string | number)[]> {
    const data = parse(input)
    const connectionLimit = dataset === 'sample' ? 10 : 1000

    yield ['Day 8: Playground - Part 1 (Brute force)', 'Result', partOneBrute(data, connectionLimit, 3)]
    yield ['Day 8: Playground - Part 1 (Brute force - Optimized)', 'Result', partOneBruteOptimized(data, connectionLimit, 3)]
    yield ['Day 8: Playground - Part 1 (Disjoint set)', 'Result', partOneDisjointSet(data, connectionLimit, 3)]

    yield ['Day 8: Playground - Part 2 (Brute force)', 'Result', partTwoBrute(data)]
    yield ['Day 8: Playground - Part 2 (Brute force - Optimized)', 'Result', partTwoBruteOptimized(data)]
    return ['Day 8: Playground - Part 2 (Disjoint set)', 'Result', partTwoDisjointSet(data)]
}

export { parse, solve }
