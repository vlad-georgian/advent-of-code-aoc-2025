import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it } from 'vitest'

import { datasetsRootPath } from '../dataset.ts'
import * as dayTwelveHarness from './index.ts'
import { partOne } from './part-one.ts'

const datasetPath = `${datasetsRootPath}/day-12`

describe('Day 12: Christmas tree farm - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`${datasetPath}/sample.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayTwelveHarness.parse(data)
    })

    it('should throw an error while trying to solve part 1 for the sample dataset', () => {
        expect(() => partOne(lines)).toThrowError('EXPECTED')
    })
})

describe('Day 12: Christmas tree farm - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${datasetPath}/input.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayTwelveHarness.parse(data)
    })

    it('should solve part 1', () => {
        const result = partOne(lines)

        expect(result).toEqual(569)
    })
})
