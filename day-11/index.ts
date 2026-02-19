import { partOne } from './part-one.ts'
import { partTwo } from './part-two.ts'

function parse(input: string) {
    return input.toString().trimEnd().split('\r\n')
}

// oxlint-disable-next-line require-yield
function* solvePartOne(input: string): Generator<never, (string | number)[]> {
    const data = parse(input)

    const { result, cacheHits, iterations } = partOne(data)
    let cacheRate = ((cacheHits * 100) / iterations).toFixed(2)
    return ['Day 11: Reactor - Part 1', 'Total paths', result, `(Iterations: ${iterations}, Cached: ${cacheHits} ${cacheRate}%)`]
}

// oxlint-disable-next-line require-yield
function* solvePartTwo(input: string): Generator<never, (string | number)[]> {
    const data = parse(input)

    const { result, cacheHits, iterations } = partTwo(data, ['fft', 'dac'])
    const cacheRate = ((cacheHits * 100) / iterations).toFixed(2)
    return ['Day 11: Reactor - Part 2', 'Total paths', result, `(Iterations: ${iterations}, Cached: ${cacheHits} ${cacheRate}%)`]
}

export const dayElevenPartOne = { parse, solve: solvePartOne }
export const dayElevenPartTwo = { parse, solve: solvePartTwo }
