import { dialStart, dialMax } from './shared.ts'

export function partOne(rotations: string[]): number {
    if (!rotations?.length) {
        throw new Error('No rotations provided')
    }

    let current = dialStart
    let timesAtZero = 0

    for (const rotation of rotations) {
        const rotationCount: number = Number(rotation.slice(1)) % dialMax
        switch (rotation[0]) {
            case 'R':
                current += rotationCount
                break
            case 'L':
                current -= rotationCount
                if (current < 0) {
                    current = dialMax + (current % dialMax)
                }
                break
            default:
                throw new Error(`Invalid rotation ${rotation}`)
        }

        current %= dialMax

        // Add an extra rotation if we are at zero
        timesAtZero += Number(current === 0)
    }

    return timesAtZero
}
