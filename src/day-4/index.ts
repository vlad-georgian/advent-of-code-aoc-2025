import { partOne } from './part-one.ts'
import { partTwo } from './part-two.ts'

export function parse(input: string): string[][] {
    return input
        .toString()
        .trimEnd()
        .split('\r\n')
        .map((row) => row.split(''))
}

export function* solve(input: string): Generator<(string | number)[]> {
    let diagram = parse(input)

    yield ['Day 4: Printing department - Part 1', 'Max accessible', partOne(diagram)]

    diagram = parse(input)
    return ['Day 4: Printing department - Part 2', 'Max accessible', partTwo(diagram)]
}
