import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it } from 'vitest'

import * as dayTwoHarness from './index.ts'
import { partOne } from './part-one.ts'
import { partTwo } from './part-two.ts'

const pathPrefix = './datasets/day-2'

describe('Day 2: Gift shop - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`datasets/${pathPrefix}/sample.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayTwoHarness.parse(data)
    })

    it('should solve part 1', () => {
        const result = partOne(lines)

        expect(result).toEqual(1227775554)
    })

    it('should solve part 2', () => {
        const result = partTwo(lines)

        expect(result).toEqual(4174379265)
    })
})

describe('Day 2: Gift shop - Input dataset', async () => {
    const dataRaw = await fs.readFile(`datasets/${pathPrefix}/input.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayTwoHarness.parse(data)
    })

    it('should solve part 1', () => {
        const result = partOne(lines)

        expect(result).toEqual(19386344315)
    })

    it('should solve part 2', () => {
        const result = partTwo(lines)

        expect(result).toEqual(34421651192)
    })
})
