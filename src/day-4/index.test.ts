import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it } from 'vitest'

import { datasetsRootPath } from '../dataset.ts'
import * as dayFourHarness from './index.ts'
import { partOne } from './part-one.ts'
import { partTwo } from './part-two.ts'

const datasetPath = `${datasetsRootPath}/day-4`

describe('Day 4: Printing department - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`${datasetPath}/sample.txt`)
    const data = dataRaw.toString()
    let diagram: string[][] = []

    beforeEach(async () => {
        diagram = dayFourHarness.parse(data)
    })

    it('should solve part 1', () => {
        const result = partOne(diagram)

        expect(result).toEqual(13)
    })

    it('should solve part 2', () => {
        const result = partTwo(diagram)

        expect(result).toEqual(43)
    })
})

describe('Day 4: Printing department - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${datasetPath}/input.txt`)
    const data = dataRaw.toString()
    let diagram: string[][] = []

    beforeEach(async () => {
        diagram = dayFourHarness.parse(data)
    })

    it('should solve part 1', () => {
        const result = partOne(diagram)

        expect(result).toEqual(1533)
    })

    it('should solve part 2', () => {
        const result = partTwo(diagram)

        expect(result).toEqual(9206)
    })
})
