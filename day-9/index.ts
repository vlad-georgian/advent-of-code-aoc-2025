import { partOne as partOneBrute, partTwo as partTwoBrute } from './brute-force.js'
import { partTwo as partTwoRaycast } from './raycast.js'

function parse(input: string) {
    return input.toString().trimEnd().split('\r\n')
}

function* solve(input: string): Generator<(string | number)[]> {
    const data = parse(input)

    yield ['Day 9: Movie theater - Part 1 (Brute force)', 'Result', partOneBrute(data)]

    yield ['Day 9: Movie theater - Part 2 (Brute force)', 'Result', partTwoBrute(data)]
    return ['Day 9: Movie theater - Part 2 (Raycast)', 'Result', partTwoRaycast(data)]
}

export { parse, solve }
