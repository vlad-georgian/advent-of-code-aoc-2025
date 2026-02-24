import { partOne } from './part-one.ts'

export function parse(input: string) {
    return input.toString().trimEnd().split('\r\n\r\n')
}

// oxlint-disable-next-line require-yield
export function* solve(input: string, _optimal?: boolean, dataset?: string): Generator<never, (string | number)[]> {
    const data = parse(input)
    let result: string | number = 'N/A'

    try {
        result = partOne(data)
    } catch (err) {
        // Looks odd, but this is expected
        if (dataset === 'sample') {
            if (err instanceof Error) {
                console.error(err.message)
            }
        } else {
            throw err instanceof Error ? err : new Error('Failed to compute result!')
        }
    }
    return ['Day 12: Christmas tree farm - Part 1', 'Total fitting regions', result]
}
