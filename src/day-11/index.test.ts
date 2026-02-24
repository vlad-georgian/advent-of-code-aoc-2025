import * as fs from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

import { datasetsRootPath } from '../dataset.ts'
import { dayElevenPartOne, dayElevenPartTwo } from './index.ts'
import { partOne } from './part-one.ts'
import { partTwo } from './part-two.ts'

const datasetPath = `${datasetsRootPath}/day-11`

describe('Day 11: Reactor - Sample dataset', async () => {
    let dataRaw: Buffer
    let data: string
    let lines: string[] = []

    it('should solve part 1', async () => {
        dataRaw = await fs.readFile(`${datasetPath}/sample-p1.txt`)
        data = dataRaw.toString()
        lines = dayElevenPartOne.parse(data)

        const { result } = partOne(lines, 'you', 'out')

        expect(result).toEqual(5)
    })

    it('should solve part 2 using the raycast approach', async () => {
        dataRaw = await fs.readFile(`${datasetPath}/sample-p2.txt`)
        data = dataRaw.toString()
        lines = dayElevenPartTwo.parse(data)

        const { result } = partTwo(lines, ['fft', 'dac'])

        expect(result).toEqual(2)
    })
})

describe('Day 10: Factory - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${datasetPath}/input.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    it('should solve part 1', () => {
        lines = dayElevenPartOne.parse(data)
        const { result } = partOne(lines, 'you', 'out')

        expect(result).toEqual(607)
    })

    it('should solve part 2 using the raycast approach', () => {
        lines = dayElevenPartTwo.parse(data)
        const { result } = partTwo(lines, ['fft', 'dac'])

        expect(result).toEqual(506264456238938)
    })
})
