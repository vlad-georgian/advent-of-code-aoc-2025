import { partOne } from './part-one.ts'
import { partTwoBrute } from './part-two-brute.ts'
import { partTwoWindow } from './part-two-window.ts'

export function parse(input: string): string[] {
    return input.toString().trimEnd().split('\r\n')
}

export function* solve(input: string, optimal: boolean = false): Generator<(string | number)[]> {
    const lines = parse(input)

    yield ['Day 3: Lobby - Part 1', 'Joltage sum', partOne(lines)]

    if (!optimal) {
        yield ['Day 3: Lobby - Part 2 (Brute force)', 'Joltage sum', partTwoBrute(lines)]
    }

    return ['Day 3: Lobby - Part 2 (Sliding window)', 'Joltage sum', partTwoWindow(lines)]
}
