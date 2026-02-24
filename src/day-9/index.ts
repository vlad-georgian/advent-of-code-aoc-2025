import { partOne as partOneBrute } from './brute-force/part-one.ts'
import { partTwo as partTwoBrute } from './brute-force/part-two.ts'
import { partTwo as partTwoRaycast } from './raycast/part-two.ts'

export function parse(input: string) {
    return input.toString().trimEnd().split('\r\n')
}

export function* solve(input: string, optimal?: boolean): Generator<(string | number)[]> {
    const data = parse(input)

    yield ['Day 9: Movie theater - Part 1', 'Result', partOneBrute(data)]

    // Part 2 solutions
    if (!optimal) {
        yield ['Day 9: Movie theater - Part 2 (Brute force)', 'Result', partTwoBrute(data)]
    }

    return ['Day 9: Movie theater - Part 2 (Raycast)', 'Result', partTwoRaycast(data)]
}
