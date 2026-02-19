import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it } from 'vitest'

import * as dayFiveHarness from './index.ts'
import { partOne } from './part-one.ts'
import { partTwo } from './part-two.ts'

const pathPrefix = './day-5'

describe('Day 5: Cafeteria - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`datasets/${pathPrefix}/sample.txt`)
    const data = dataRaw.toString()
    let parts: string[] = []

    beforeEach(async () => {
        parts = dayFiveHarness.parse(data)
    })

    it('should solve part 1', () => {
        const result = partOne(parts)

        expect(result).toEqual(3)
    })

    it('should solve part 2', () => {
        const result = partTwo(parts)

        expect(result).toEqual(14)
    })
})

describe('Day 5: Cafeteria - Input dataset', async () => {
    const dataRaw = await fs.readFile(`datasets/${pathPrefix}/input.txt`)
    const data = dataRaw.toString()
    let parts: string[] = []

    beforeEach(async () => {
        parts = dayFiveHarness.parse(data)
    })

    it('should solve part 1', () => {
        const result = partOne(parts)

        expect(result).toEqual(896)
    })

    it('should solve part 2', () => {
        const result = partTwo(parts)

        expect(result).toEqual(346240317247002)
    })
})
