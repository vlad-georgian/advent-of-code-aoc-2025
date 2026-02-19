import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it } from 'vitest'

import * as daySixHarness from './index.ts'
import { partOne } from './part-one.ts'
import { partTwo } from './part-two.ts'

const pathPrefix = './day-6'

describe('Day 6: Trash compactor - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`datasets/${pathPrefix}/sample.txt`)
    const data = dataRaw.toString()
    let parts: string[] = []

    beforeEach(async () => {
        parts = daySixHarness.parse(data)
    })

    it('should solve part 1', () => {
        const result = partOne(parts)

        expect(result).toEqual(4277556)
    })

    it('should solve part 2', () => {
        const result = partTwo(parts)

        expect(result).toEqual(3263827)
    })
})

describe('Day 6: Trash compactor - Input dataset', async () => {
    const dataRaw = await fs.readFile(`datasets/${pathPrefix}/input.txt`)
    const data = dataRaw.toString()
    let parts: string[] = []

    beforeEach(async () => {
        parts = daySixHarness.parse(data)
    })

    it('should solve part 1', () => {
        const result = partOne(parts)

        expect(result).toEqual(6503327062445)
    })

    it('should solve part 2', () => {
        const result = partTwo(parts)

        expect(result).toEqual(9640641878593)
    })
})
