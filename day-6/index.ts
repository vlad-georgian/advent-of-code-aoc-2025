import { partOne } from './part-one.ts'
import { partTwo } from './part-two.ts'

export function parse(input: string) {
    let lines = input.toString().split('\r\n')
    lines.pop()

    return lines
}

export function* solve(input: string): Generator<(string | number)[]> {
    const lines = parse(input)

    yield ['Day 6: Trash compactor - Part 1', 'Cephalopod math grand totals', partOne(lines)]
    return ['Day 6: Trash compactor - Part 2', 'Cephalopod math grand totals', partTwo(lines)]
}
