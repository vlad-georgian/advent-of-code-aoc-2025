import { partOne } from './part-one.ts'
import { partTwo } from './part-two.ts'

export function parse(input: string) {
    return input.toString().trimEnd().split('\r\n')
}

export function* solve(input: string): Generator<(string | number)[]> {
    const data = parse(input)

    let { result: partOneResult } = partOne(data)
    yield ['Day 7: Laboratories - Part 1', 'Total beam splits', partOneResult]

    let { result: partTwoResult, iterations, cacheHits } = partTwo(data)
    const cacheRate = ((cacheHits * 100) / iterations).toFixed(2)
    return ['Day 7: Laboratories - Part 2', 'Total timelines', partTwoResult, `(Iterations: ${iterations}, Cached: ${cacheHits} ${cacheRate}%)`]
}
