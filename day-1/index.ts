import { partOne } from './part-one.ts'
import { partTwo } from './part-two.ts'

function parse(input: string): string[] {
    return input.toString().trimEnd().split('\r\n')
}

function* solve(input: string): Generator<(string | number)[]> {
    const lines = parse(input)

    yield ['Day 1: Secret entrance - Part 1', 'Times at zero', partOne(lines)]
    return ['Day 1: Secret entrance - Part 2', 'Times at zero', partTwo(lines)]
}

export { parse, solve }
