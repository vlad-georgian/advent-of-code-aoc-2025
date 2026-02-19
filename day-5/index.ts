import { partOne } from './part-one.ts'
import { partTwo } from './part-two.ts'

export function parse(input: string) {
    return input.toString().trimEnd().split('\r\n\r\n')
}

export function* solve(input: string): Generator<(string | number)[]> {
    const data = parse(input)

    yield ['Day 5: Cafeteria - Part 1', 'Max fresh', partOne(data)]
    return ['Day 5: Cafeteria - Part 2', 'Max fresh', partTwo(data)]
}
