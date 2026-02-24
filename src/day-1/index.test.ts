import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it } from 'vitest'

import { datasetsRootPath } from '../dataset.ts'
import * as dayOneHarness from './index.ts'
import { partOne } from './part-one.ts'
import { partTwo } from './part-two.ts'

const datasetPath = `${datasetsRootPath}/day-1`

describe('Day 1: Secret entrance - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`${datasetPath}/sample.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayOneHarness.parse(data)
    })

    it('should solve part 1', () => {
        const result = partOne(lines)

        expect(result).toEqual(3)
    })

    it('should solve part 2', () => {
        const result = partTwo(lines)

        expect(result).toEqual(6)
    })
})

describe('Day 1: Secret entrance - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${datasetPath}/input.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayOneHarness.parse(data)
    })

    it('should solve part 1', () => {
        const result = partOne(lines)

        expect(result).toEqual(1147)
    })

    it('should solve part 2', () => {
        const result = partTwo(lines)

        expect(result).toEqual(6789)
    })
})
