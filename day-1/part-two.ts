import { dialMax, dialStart } from './shared.ts'

export function partTwo(rotations: string[]) {
    if (!rotations?.length) {
        throw new Error('No rotations provided')
    }

    performance.mark('p2-start')

    let current = dialStart
    let timesAtZero = 0

    for (const rotation of rotations) {
        if (!rotation[0]) {
            throw new Error(`Invalid rotation ${rotation}`)
        }

        const rotationCount: number = Number(rotation.slice(1))
        const oldCurrent: number = current

        current += rotation[0] === 'R' ? rotationCount : -rotationCount
        let overflowCount: number = Math.floor(Math.abs(current) / dialMax)

        if (current <= 0) {
            current = dialMax + (current % dialMax)
            if (oldCurrent !== 0) overflowCount++
        }

        current %= dialMax
        timesAtZero += overflowCount
    }

    return timesAtZero
}
