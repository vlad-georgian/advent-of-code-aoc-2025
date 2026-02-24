import { partOne } from './part-one.ts'
import { partTwo } from './part-two.ts'

export function parse(input: string): string[] {
    return input.toString().split(',')
}

export function* solve(input: string): Generator<(string | number)[]> {
    const ranges = parse(input)

    yield ['Day 2: Gift shop - Part 1', 'Sum', partOne(ranges)]
    return ['Day 2: Gift shop  - Part 2', 'Sum', partTwo(ranges)]
}
